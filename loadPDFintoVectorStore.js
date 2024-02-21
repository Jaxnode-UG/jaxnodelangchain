import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

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

const loader = new PDFLoader("./wstg-v4.2.pdf");

const docs = await loader.load();

await pgvectorStore.addDocuments(docs);

pgvectorStore.end();
