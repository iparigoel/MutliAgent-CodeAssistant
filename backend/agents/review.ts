import {State, llm } from "./state";
export async function reviewNode(state: typeof State.State){
    const result = await llm.invoke(`
        Review the generated code and find potential bugs and suggest imrovements in time complexity and space complexity:
        Question:
        ${state.question}
        Coding:
        ${state.coding}
        ML Analysis:
        ${state.mlAnalysis}
        `)
        return {
            reviewing: result.content,
        };
}