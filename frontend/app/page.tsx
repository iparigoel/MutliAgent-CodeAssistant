"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ResultShape = {
    planning?: string;
    coding?: string;
    mlAnalysis?: string;
    reviewing?: string;
    testing?: string;
};

function buildAssistantMarkdown(result: ResultShape) {
    return [
        "## Plan",
        result.planning || "No plan returned.",
        "## Code",
        result.coding || "No code returned.",
        "## ML Analysis",
        result.mlAnalysis || "No ML analysis returned.",
        "## Review",
        result.reviewing || "No review returned.",
        "## Testing",
        result.testing || "No testing output returned.",
    ].join("\n\n");
}

export default function Home() {
    const [question, setQuestion] = useState("");
    const [submittedQuestion, setSubmittedQuestion] = useState("");
    const [result, setResult] = useState<ResultShape | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async (prompt: string) => {
        try {
            setLoading(true);

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ question: prompt }),
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const prompt = question.trim();

        if (!prompt || loading) {
            return;
        }

        setSubmittedQuestion(prompt);
        setQuestion("");
        await handleGenerate(prompt);
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#050816] text-slate-100">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.14),transparent_28%),radial-gradient(circle_at_20%_80%,rgba(236,72,153,0.10),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.14),transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.99),rgba(2,6,23,1))]" />
            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pt-6 sm:px-6 lg:px-8">
                <header className="mb-6 flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                        <div className="funnel-display audiowide-regular text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            CodeOrchestra AI
                        </div>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                            A cleaner, chat-style workspace for plan, code, review, ML analysis, and testing output.
                        </p>
                    </div>
                    <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 shadow-lg shadow-black/20 backdrop-blur sm:block">
                        Markdown enabled
                    </div>
                </header>

                <main className="flex-1 pb-36">
                    <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
                        {submittedQuestion.trim().length > 0 && (
                            <div className="flex justify-end">
                                <div className="max-w-3xl rounded-[28px] rounded-tr-md border border-cyan-400/20 bg-cyan-500 px-4 py-3 text-slate-950 shadow-[0_14px_40px_rgba(34,211,238,0.18)] wrap-anywhere sm:px-5 sm:py-4">
                                    <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-900/70">
                                        You
                                    </div>
                                    <div className="whitespace-pre-wrap leading-7 wrap-break-word">{submittedQuestion}</div>
                                </div>
                            </div>
                        )}

                        {result ? (
                            <section className="flex flex-col gap-5">
                                <div className="flex justify-start">
                                    <div className="max-w-4xl rounded-[28px] rounded-tl-md border border-white/10 bg-slate-900/90 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6">
                                        <div className="mb-4 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-200">
                                            Assistant
                                        </div>
                                        <div className="prose prose-invert max-w-none wrap-anywhere prose-headings:scroll-mt-24 prose-headings:text-white prose-headings:break-words prose-p:leading-7 prose-p:text-slate-200 prose-p:break-words prose-li:break-words prose-pre:overflow-x-auto prose-pre:rounded-2xl prose-pre:border prose-pre:border-white/10 prose-pre:bg-slate-950 prose-pre:px-4 prose-pre:py-3 prose-pre:text-slate-100 prose-code:text-cyan-200">
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    h2: ({ children }) => (
                                                        <h2 className="mt-7 mb-3 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-base font-bold uppercase tracking-[0.14em] text-cyan-200">
                                                            {children}
                                                        </h2>
                                                    ),
                                                }}
                                            >
                                                {buildAssistantMarkdown(result)}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ) : (
                            <section className="flex min-h-[48vh] flex-col items-center justify-center rounded-4xl border border-white/10 bg-slate-950/40 px-6 py-14 text-center shadow-[0_18px_60px_rgba(0,0,0,0.25)] backdrop-blur-sm">
                                <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-300">
                                    Ready when you are
                                </div>
                                <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                                    Send a prompt and get a structured response in one polished chat flow.
                                </h2>
                                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                                    The assistant will answer in markdown so headings, bullets, and code blocks stay readable and consistent.
                                </p>
                            </section>
                        )}
                    </div>
                </main>

                <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-slate-950/88 backdrop-blur-xl">
                    <div className="mx-auto w-full max-w-7xl px-3 py-2.5 sm:px-4 lg:px-6">
                        <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-slate-900/85 px-3 py-2.5 shadow-[0_18px_60px_rgba(0,0,0,0.35)] sm:px-4 sm:py-3">
                            <div className="flex items-center gap-2">
                                <div className="flex-1">
                                    <label htmlFor="chat-input" className="sr-only">Your prompt</label>
                                    <input
                                        id="chat-input"
                                        type="text"
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                        placeholder="Ask your coding assistant..."
                                        className="h-11 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 sm:text-base"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading || question.trim().length === 0}
                                    className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-36 sm:text-base"
                                >
                                    {loading ? "Generating..." : "Generate"}
                                </button>
                            </div>
                        </form>
                    </div>
                </footer>
            </div>
        </div>
    );
}