import { Document } from "@langchain/core/documents";
import { promises as fsp } from 'fs';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";

const outputText = await fsp.readFile('./output.txt', 'utf8');

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
  });

const docOutput = await splitter.splitDocuments([
    new Document({ pageContent: outputText }),
]);

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

const embeddings = new OllamaEmbeddings({
  model: "llama2", // default value
  baseUrl: "http://localhost:11434", // default value
  requestOptions: {
    useMMap: true,
    numThread: 6,
    numGpu: 1,
  },
});

const pgvectorStore = await PGVectorStore.initialize(
    embeddings,
    config
);

await pgvectorStore.addDocuments(docOutput);

const results = await pgvectorStore.similaritySearch("TimescaleDB", 1);

console.log(results);

await pgvectorStore.end();
