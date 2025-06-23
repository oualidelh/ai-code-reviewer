"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bug, Info } from "lucide-react";

export type CodeReview = {
  bugs: string[];
  suggestions: string[];
  explanation: string[];
  fixes: string;
}[];

interface resultSectionProps {
  codeReview: CodeReview;
}

const ResultSection = ({ codeReview }: resultSectionProps) => {
  const review = codeReview[0];

  if (!review) return null;

  return (
    <div className="w-full h-auto animate-fadeIn">
      <h1 className="text-xl font-bold mb-4">Code Review Results</h1>
      <section className="w-full h-auto">
        <Tabs defaultValue="bugs" className="w-full">
          <TabsList className="w-full h-10 grid grid-cols-4 mb-6 gap-2 rounded-lg">
            <TabsTrigger value="bugs" className="rounded-lg ">
              Bugs
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="rounded-lg">
              Suggestions
            </TabsTrigger>
            <TabsTrigger value="explanation" className="rounded-lg">
              Explanation
            </TabsTrigger>
            <TabsTrigger value="fixes" className="rounded-lg">
              Fixes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bugs">
            {review.bugs.length > 0 ? (
              <ul className="bg-destructive/10 p-3 border border-destructive/20 rounded-lg  space-y-2">
                {review.bugs.map((bug, idx) => (
                  <li
                    className="flex items-start space-x-2 font-semibold"
                    key={idx}
                  >
                    <Bug color="#c70f0f" className="h-6 w-6 flex-shrink-0" />
                    <span>{bug}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">
                No bugs found in your code.
              </p>
            )}
          </TabsContent>

          <TabsContent value="suggestions">
            {review.suggestions.length > 0 ? (
              <ul className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20 space-y-2">
                {review.suggestions.map((s, idx) => (
                  <li
                    className="flex items-start space-x-2 font-semibold"
                    key={idx}
                  >
                    <Info color="#0f24c7" className="h-6 w-6 flex-shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No suggestions provided.</p>
            )}
          </TabsContent>

          <TabsContent value="explanation">
            {review.explanation.length > 0 ? (
              <ul className="bg-green-500/10 rounded-lg p-3 border border-green-500/20 space-y-2">
                {review.explanation.map((e, idx) => (
                  <li
                    className="flex items-start space-x-2 font-semibold"
                    key={idx}
                  >
                    <Info color="#0fc73d" className="h-6 w-6 flex-shrink-0" />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No explanation available.</p>
            )}
          </TabsContent>

          <TabsContent value="fixes">
            {review.fixes ? (
              <pre className="whitespace-pre-wrap p-3 rounded-lg border bg-amber-500/10 border-amber-500/20">
                {review.fixes}
              </pre>
            ) : (
              <p className="text-muted-foreground">
                No fixed version provided.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default ResultSection;
