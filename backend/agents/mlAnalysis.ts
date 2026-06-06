import {State, llm } from "./state";
require("dotenv").config();

export async function mlAnalysisNode(state: typeof State.State){
    const response = await fetch(
        process.env.MODEL_URL!,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code: state.coding,
            }),
        }
    );
    const result = await response.json();
    return {
        mlAnalysis: JSON.stringify(result, null, 2),
    };
}