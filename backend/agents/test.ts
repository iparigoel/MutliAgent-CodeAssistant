import {State, llm } from "./state";
export async function testNode(state: typeof State.State){
    const result = await llm.invoke(`
        Generate test cases for the given question, coding and reviewing:
        Question:
        ${state.question}
        Coding:
        ${state.coding}
        Reviewing:
        ${state.reviewing}
        `)
        return {
            testing: result.content
        };
}