import { Document } from "@langchain/core/documents";
import { promises as fsp } from 'fs';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const outputText = await fsp.readFile('./documentexample.txt', 'utf8');

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
  });

const docOutput = await splitter.splitDocuments([
    new Document({ pageContent: outputText }),
]);

// Load the docs into the vector store
const vectorStore = await HNSWLib.fromDocuments(docOutput, new OpenAIEmbeddings());

// Search for the most similar document
const result = await vectorStore.similaritySearch("Tech Hiring process", 1);
console.log(result[0].pageContent);
const blogSection = result[0].pageContent;

const prompt = ChatPromptTemplate.fromMessages([
    ["human", `What is this blog posts assessment of the current state of tech hiring.  
    
Blog context: {blogContext}?`],
]);
const model = new ChatOpenAI({ temperature: 0 });
const outputParser = new StringOutputParser();

const chain = prompt.pipe(model).pipe(outputParser);

const stream = await chain.stream({
    blogContext: blogSection
});

for await (const chunk of stream) {
    process.stdout.write(chunk, 'utf-8');
}
