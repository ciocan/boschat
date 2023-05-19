# BOS Chat - chat with DeFI apps

## Description
A chat interface where you can ask questions about defi and blockchain and chat with them using ChatGPT as the large language model.

![boschat-screenshot](https://github.com/ciocan/boschat/assets/4984377/795db3de-cb7e-4f12-b268-dfd5e8d179fd)

## Installation

1. Make sure you ave installed Node v18 or later
2. Download the tool's repository using the command:

```bash
git clone git@github.com:ciocan/boschat.git
```

3. Move to the tool's directory and install the tool

```bash
cd boschat
npm install
```

4. Copy the .env.example into .env file and add the following variables:

```bash
WEAVIATE_HOST= # use just domain without https://
WEAVIATE_API_KEY=

# open ai key
OPENAI_API_KEY=
HELICONE_API_KEY=
```

Weaviate is an open source vector database where the documents are vectorized and indexed. You can install it locally or use their [free cloud](https://console.weaviate.cloud/).

Signup for an OpenAI API key [here](https://platform.openai.com/)

Helicone is the Observability platform for Generative AI. Signup for key [here](https://www.helicone.ai/) 

1. Start the tool

```bash
npm run dev
```

## Tech Stack

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

Additional libraries:

- [Zustand](https://github.com/pmndrs/zustand) - Used for state management
- [Mantine UI](https://mantine.dev) - Used for awesome UI components
- [LangChain](https://js.langchain.com/docs/) - Used for interacting with the LLM model (OpenAI)
