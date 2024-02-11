import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";

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

await pgvectorStore.addDocuments([
    { pageContent: "what's this", metadata: { a: 2 } },
    { pageContent: "Cat drinks milk", metadata: { a: 1 } },
]);

const results = await pgvectorStore.similaritySearch("water", 1);

console.log(results);
  