import {State, llm } from "./state";

export async function planNode(state: typeof State.State){
    const result = await llm.invoke(`
        Plan how to code for the given question and what will be the time complexity and space complexity:
        Question: 
        ${state.question}
        `);
        return {
            planning: result.content,
        }
}