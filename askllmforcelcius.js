import * as dotenv from 'dotenv';
dotenv.config();
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const prompt = ChatPromptTemplate.fromMessages([
    ["human", "What is temperature in Celsius if the Fahrenheit temperature is {fahrenheitTemp}?"],
]);
const model = new ChatOpenAI({ temperature: 0 });
const outputParser = new StringOutputParser();

const chain = prompt.pipe(model).pipe(outputParser);

const stream = await chain.stream({
    fahrenheitTemp: "68"
});

for await (const chunk of stream) {
    process.stdout.write(chunk, 'utf-8');
}