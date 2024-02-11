import { Document } from "@langchain/core/documents";
import { promises as fsp } from 'fs';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const outputText = await fsp.readFile('./output.txt', 'utf8');

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
  });

const docOutput = await splitter.splitDocuments([
    new Document({ pageContent: outputText }),
]);

console.log(docOutput);
