import { OllamaEmbeddings } from "langchain/embeddings/ollama";

const embeddings = new OllamaEmbeddings({
  model: "llama2", // default value
  baseUrl: "http://localhost:11434", // default value
  requestOptions: {
    useMMap: true,
    numThread: 6,
    numGpu: 1,
  },
});

const documents = ["Hello World!", "Bye Bye"];

const documentEmbeddings = await embeddings.embedDocuments(documents);
const arraylengths = documentEmbeddings.map((x) => x.length);
console.log(arraylengths);