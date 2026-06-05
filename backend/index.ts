require("dotenv").config();
import express, { Request, Response } from "express";
import cors from "cors";
const app = express();
const port = 5000;
import { graph } from "./agents/workflow";

app.use(cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    }));
app.use(express.json());    

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.post("/generate", async(req: Request, res: Response) => {
    try{
        const {question} = req.body;
        const result = await graph.invoke({
            question,
        });
        res.json(result);
    }catch(e){
        console.error(e);
        res.status(500).json({error: "An error occurred"})
    }
})

// const response = await fetch(
//     "http://localhost:8000/predict",
//     {
//         method: "POST",
//         headers:{
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             code: generatedCode,
//         })
//     }
// );
// const result = await response.json();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});