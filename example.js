// Wite a Langchain js program that sends a prompt to the OpenAI LLM model and outputs the results to a stream in the process.stdout.

import * as dotenv from "dotenv";
dotenv.config();
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const prompt = ChatPromptTemplate.fromMessages([
    ["human", "What is the formula for converting Celsius to Fahrenheit temperature"]
]);
const model = new ChatOpenAI({ temperature: 0 });
const outputParser = new StringOutputParser();

const chain = prompt.pipe(model).pipe(outputParser);
const stream = await chain.stream();

for await (const chunk of stream) {
    process.stdout.write(chunk, 'utf-8');
}
