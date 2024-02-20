import * as dotenv from 'dotenv';
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { pull } from "langchain/hub";
import { ChatOpenAI } from "@langchain/openai";

dotenv.config();

// Define the tools the agent will have access to.
const tools = [new TavilySearchResults({ maxResults: 5 })];

// Get the prompt to use - you can modify this!
// If you want to see the prompt in full, you can at:
// https://smith.langchain.com/hub/hwchase17/openai-functions-agent
const prompt = await pull("hwchase17/openai-functions-agent");

const llm = new ChatOpenAI({
    modelName: "gpt-3.5-turbo-1106",
    temperature: 0,
});

const agent = await createOpenAIFunctionsAgent({
    llm,
    tools,
    prompt,
});

const agentExecutor = new AgentExecutor({
    agent,
    tools,
});
  
const result = await agentExecutor.invoke({
    input: "What is JaxNode?",
});
  
console.log(result);
  