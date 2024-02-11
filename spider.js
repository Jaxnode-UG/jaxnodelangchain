import * as cheerio from 'cheerio';
import fs from 'fs';

let contentLinkArray = [];
const domain = 'https://fek.io/';
const initialPage = 'blog';
const fisrtPage = `${domain}/${initialPage}`; 

let pagetext = await pageLoader(fisrtPage);

await recursivePageLoader(pagetext);

const writeStream = fs.createWriteStream('output.txt');

await readAllURLsToFile(contentLinkArray);

async function readAllURLsToFile(links) {
   for (const url of links) {
       let blogPostURL = `${domain}${url}`;
       let posttext = await pageLoader(blogPostURL);

       let $ = cheerio.load(posttext);
       let blogText = $('article').text();
       writeStream.write(blogText + '\n\n\n\n');
   }
   writeStream.end(); 
}

async function pageLoader(url) {
   const pagedata = await fetch(url);
   const pagetext = await pagedata.text();
   return pagetext;
}

async function recursivePageLoader(pagetext) {
   const aClassSelector = 'div.bloglistitem-module--listitem--99998 > div > a';
   const $ = cheerio.load(pagetext);
   
   const links = $(aClassSelector);
   
   for (let linkObj of links) {
       contentLinkArray.push(linkObj.attribs.href);
   }
   
   let nextLink = $('a[rel="next"]');
   
   if (nextLink[0]) {
       console.log(nextLink[0].attribs.href);
       const nextPage = `${domain}/${nextLink[0].attribs.href}`;
       const nextPageText = await pageLoader(nextPage);
       await recursivePageLoader(nextPageText);
   } 
}
