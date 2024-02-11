import { Ollama } from "@langchain/community/llms/ollama";

const ollama = new Ollama({
    baseUrl: "http://localhost:11434", 
    model: "llama2", 
});

const stream = await ollama.stream(
  `Translate "I love programming" into German.`
);

for await (const chunk of stream) {
    process.stdout.write(chunk, 'utf-8');
}
