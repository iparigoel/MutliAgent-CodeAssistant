"use client";

import { useState } from "react";

export default function Home() {
    const [question, setQuestion] = useState("");
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        try {
            setLoading(true);

            const response = await fetch(`${process.env.BASE_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ question }),
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask your coding assistant..."
                className="border p-2 w-full rounded"
            />

            <button
                onClick={handleGenerate}
                disabled={loading}
                className="mt-4 px-4 py-2 border rounded"
            >
                {loading ? "Generating..." : "Generate"}
            </button>

            {result && (
                <div className="mt-8 text-4xl font-bold">
                    <h2 className="">Plan</h2>
                    <pre>{result.planning}</pre>

                    <h2 className="text-4xl font-bold mt-6">Code</h2>
                    <pre>{result.coding}</pre>

                    <h2 className="text-4xl font-bold mt-6">ML Analysis</h2>
                    <pre>{result.mlAnalysis}</pre>

                    <h2 className="text-4xl font-bold mt-6">Review</h2>
                    <pre>{result.reviewing}</pre>

                    <h2 className="text-4xl font-bold mt-6">Testing</h2>
                    <pre>{result.testing}</pre>
                </div>
            )}
        </div>
    );
}