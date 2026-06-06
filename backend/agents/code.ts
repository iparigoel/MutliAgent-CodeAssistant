import { State, llm } from "./state";

export async function codeNode(state: typeof State.State) {
    const result = await llm.invoke(`
        Generate code for the given question and planning:
        Question:
        ${state.question}
        Planning:
        ${state.planning}
        `);
    return {
        coding: result.content,
    }
}