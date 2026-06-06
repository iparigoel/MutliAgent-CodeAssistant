import { END, START, StateGraph } from "@langchain/langgraph";
import { planNode } from "./plan";
import { codeNode } from "./code";
import { reviewNode } from "./review";
import { testNode } from "./test";
import { State } from "./state";
import { mlAnalysisNode } from "./mlAnalysis";
const workflow = new StateGraph(State)
    .addNode("planningAgent", planNode)
    .addNode("codingAgent", codeNode)
    .addNode("reviewingAgent", reviewNode)
    .addNode("testingAgent", testNode)
    .addNode("mlAnalysisAgent", mlAnalysisNode)
    .addEdge(START, "planningAgent")
    .addEdge("planningAgent", "codingAgent")
    .addEdge("codingAgent", "mlAnalysisAgent")
    .addEdge("mlAnalysisAgent", "reviewingAgent")
    .addEdge("reviewingAgent", "testingAgent")
    .addEdge("testingAgent", END);

const graph = workflow.compile();

async function printGraph() {
    const drawableGraph = await graph.getGraphAsync();
    console.log(drawableGraph.drawMermaid());
}

printGraph();

export { graph };