import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";

const embeddings = new OllamaEmbeddings({
  model: "llama2", // default value
  baseUrl: "http://localhost:11434", // default value
  requestOptions: {
    useMMap: true,
    numThread: 6,
    numGpu: 1,
  },
});

const documents = ["Post on iPhone programming with Objective-C or Swift"];

const documentEmbeddings = await embeddings.embedDocuments(documents);
console.log(JSON.stringify(documentEmbeddings[0]));
