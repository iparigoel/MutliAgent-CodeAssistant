import { ChatOpenAI } from "@langchain/openai";
import { Annotation } from "@langchain/langgraph";

const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
});

const State = Annotation.Root({
    question: Annotation<string>(),
    planning: Annotation<string>(),
    coding: Annotation<string>(),
    reviewing: Annotation<string>(),
    testing: Annotation<string>(),
});

export {State, llm};