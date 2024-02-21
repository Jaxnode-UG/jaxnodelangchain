import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";
import { formatDocumentsAsString } from "langchain/util/document";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

const embeddings = new OllamaEmbeddings({
    model: "llama2", // default value
    baseUrl: "http://localhost:11434", // default value
    requestOptions: {
        useMMap: true,
        numThread: 6,
        numGpu: 1,
    },
});

const config = {
    postgresConnectionOptions: {
      type: "postgres",
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "password",
      database: "jaxnodevector",
    },
    tableName: "vectordocs",
    columns: {
      idColumnName: "id",
      vectorColumnName: "vector",
      contentColumnName: "content",
      metadataColumnName: "metadata",
    },
};

const pgvectorStore = await PGVectorStore.initialize(
    embeddings,
    config
);

const model = new ChatOllama({
  baseUrl: "http://localhost:11434", // Default value
  model: "llama2", // Default value
  debug: true,
  callbacks: [
    {
      handleLLMNewToken(token) {
        process.stdout.write(token, 'utf-8');
      },
      handleLLMError(e) {
        console.error(e);
      },
      handleLLMEnd() {
        console.log("");
      },
    },
  ],
});

const retriever = pgvectorStore.asRetriever();

const prompt = PromptTemplate.fromTemplate(`Answer the question based only on the following context:
{context}

Question: {question}`);

const chain = RunnableSequence.from([
  {
      context: retriever.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough(),
  },
  prompt,
  model,
  new StringOutputParser(),
]);

// const logStream = 
await chain.invoke("How can I prevent XPath injection in my Java apps?");

pgvectorStore.end();
