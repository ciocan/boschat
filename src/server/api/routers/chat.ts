import { z } from "zod";
import { WeaviateStore } from "langchain/vectorstores/weaviate";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAIChat } from "langchain/llms/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import weaviate from "weaviate-ts-client";
import type { Document } from "langchain/document";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { env } from "~/env.mjs";
import { type Source } from "~/state";

const heliconeConfig = {
  basePath: "https://oai.hconeai.com/v1",
  baseOptions: {
    headers: {
      "Helicone-Auth": `Bearer ${env.HELICONE_API_KEY}`,
      "Helicone-User-Id": `anonymous`,
      "Helicone-Cache-Enabled": "true",
    },
  },
};

export const wvClient = weaviate.client({
  scheme: "https",
  host: env.WEAVIATE_HOST,
  apiKey: new weaviate.ApiKey(env.WEAVIATE_API_KEY),
});

const model = new OpenAIChat({ openAIApiKey: env.OPENAI_API_KEY }, heliconeConfig);
const embeddings = new OpenAIEmbeddings({ openAIApiKey: env.OPENAI_API_KEY }, heliconeConfig);

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

      const chain = ConversationalRetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
        returnSourceDocuments: true,
      });

      const chatHistory = history.map((message) => message.text);
      const res = (await chain.call({ question, chat_history: chatHistory })) as {
        text: string;
        sourceDocuments: Document<Source>[];
      };

      if (!res) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }

      const text = res.text;
      const source = res.sourceDocuments.map((doc) => doc.metadata);

      return { text, source };
    }),
});
