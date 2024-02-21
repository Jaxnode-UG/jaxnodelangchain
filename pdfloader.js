// Create a javascript langchain script that will load a pdf file and split it into chunks of text.

import { PDFLoader } from "langchain/document_loaders/fs/pdf";

const loader = new PDFLoader("./wstg-v4.2.pdf");

const docs = await loader.load();
console.log(docs);
