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

class HttpError extends Error {
    constructor( message: string) {
        super(message);
    }
}

app.post("/generate", async (req: Request, res: Response) => {
    try {
        const { question } = req.body;
        if (!question) {
            throw new HttpError("Question is required");
        }
        const result = await graph.invoke({
            question,
        });
        res.status(200).json(result);
    } catch (e) {
        console.error(e);
        if (e instanceof HttpError) {
            return res.status(400).json({ error: e.message });
        }
        res.status(500).json({ error: "An error occurred" })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});