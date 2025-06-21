"use client";
import { useEffect, useRef, useState } from "react";
import CodeEditor from "./CodeEditor";
import NavBar from "./NavBar";
import { prompt } from "@/lib/codePrompt";
import ResultSection from "./ResultSection";
import { tryFixAndParse } from "@/lib/utils";
import CodeRevButton from "./CodeRevButton";
import { toast } from "sonner";

export type CodeReview = {
  bugs: string[];
  suggestions: string[];
  explanation: string[];
  fixes: string;
}[];

const HomePage = () => {
  const [code, setCode] = useState<string>("");
  const [codeReview, setCodeReview] = useState<CodeReview>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const resultSecRef = useRef<HTMLDivElement | null>(null);
  console.log("code", code);
  console.log("review data", codeReview);

  useEffect(() => {
    const scrollIntoResultSection = () => {
      if (!resultSecRef.current) return;

      if (codeReview.length !== 0) {
        resultSecRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    scrollIntoResultSection();
  }, [codeReview]);

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      localStorage.setItem("code", value);
    }
  };

  async function handleFetchReview() {
    setIsLoading(true);
    setCodeReview(() => []);
    setError("");
    try {
      const response = await fetch("/api/reviewCode", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          code: code,
        }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data?.error?.message || "Unknown server error");

      console.log("data", data);
      const aiMessage = data.data?.candidates?.[0]?.content?.parts?.[0].text;
      // let parsedResult = null;
      // parsedResult = JSON.parse(aiMessage);
      // console.log("parsed result", parsedResult);
      const parsed = tryFixAndParse(aiMessage);
      console.log("parsed", parsed);
      console.log("parsedResult", data);
      setCodeReview(parsed);
    } catch (err) {
      if (err instanceof Error) {
        console.log("errmessage", err.message);
        setError(err.message);
        toast(error);
      } else {
        toast("unknow error happened");
        setError("unknow error happened");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground theme-transition">
      <NavBar />
      <div className=" flex flex-col items-center p-3 pt-24">
        <div className="glass responsiveness text-center py-6 my-8 min-h-[150px] mx-2 space-y-3">
          <h1 className="font-bold sm:text-4xl text-3xl">AI Code Reviewer</h1>
          <p className="text-gray-500  max-w-2xl mx-auto">
            Get instant feedback on your code. Identify bugs, security issues,
            and receive suggestions to improve your code quality.
          </p>
        </div>
        <div className="responsiveness h-[550px] ">
          <CodeEditor
            code={code}
            handleCodeChange={handleCodeChange}
            isLoading={isLoading}
          />
        </div>
        <div>
          <CodeRevButton
            isLoading={isLoading}
            handleFetchReview={handleFetchReview}
          />
        </div>
        {/* <div>{codeReview}</div> */}
        <div ref={resultSecRef} className="responsiveness h-auto">
          <ResultSection codeReview={codeReview} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
