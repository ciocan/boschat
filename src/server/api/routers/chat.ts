import { z } from "zod";
import { WeaviateStore } from "langchain/vectorstores/weaviate";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAIChat } from "langchain/llms/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import weaviate from "weaviate-ts-client";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { env } from "~/env.mjs";

export const wvClient = weaviate.client({
  scheme: "https",
  host: env.WEAVIATE_HOST,
  apiKey: new weaviate.ApiKey(env.WEAVIATE_API_KEY),
});

const model = new OpenAIChat(
  { openAIApiKey: env.OPENAI_API_KEY },
  {
    basePath: "https://oai.hconeai.com/v1",
    baseOptions: {
      headers: {
        "Helicone-Auth": `Bearer ${env.HELICONE_API_KEY}`,
      },
    },
  },
);
const embeddings = new OpenAIEmbeddings(
  { openAIApiKey: env.OPENAI_API_KEY },
  {
    basePath: "https://oai.hconeai.com/v1",
    baseOptions: {
      headers: {
        "Helicone-Auth": `Bearer ${env.HELICONE_API_KEY}`,
      },
    },
  },
);

export const chatRouter = createTRPCRouter({
  prompt: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        question: z.string(),
        history: z.array(z.object({ agent: z.string(), text: z.string() })),
      }),
    )
    .mutation(async ({ input }) => {
      const { question, history } = input;

      const vectorStore = await WeaviateStore.fromExistingIndex(embeddings, {
        client: wvClient,
        indexName: "BosChat",
        metadataKeys: ["url", "title"],
      });

      const chain = ConversationalRetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

      const chatHistory = history.map((message) => message.text);
      const res = await chain.call({ question, chat_history: chatHistory });

      if (!res) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }

      const response = res.text as string;
      return response;
    }),
});
