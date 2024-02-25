import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";

const embeddings = new OllamaEmbeddings({
  model: "nomic-embed-text", // default value
  baseUrl: "http://localhost:11434", // default value
  requestOptions: {
    useMMap: true,
    numThread: 6,
    numGpu: 1,
  },
});

const documents = ["Hello World!", "Bye Bye", "Why is the sky blue?"];

const documentEmbeddings = await embeddings.embedDocuments(documents);
const arraylengths = documentEmbeddings.map((x) => x.length);
console.log(arraylengths);