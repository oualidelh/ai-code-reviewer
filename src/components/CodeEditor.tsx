import React, { useEffect, useRef, useState } from "react";
import { Editor, type OnMount } from "@monaco-editor/react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useTheme } from "@/context/themeContext";

type IStandaloneCodeEditor = Parameters<OnMount>[0];

interface codeEditorProps {
  code: string | undefined;
  handleCodeChange: (value: string | undefined) => void;
  isLoading: boolean;
}

const CodeEditor = ({ code, handleCodeChange, isLoading }: codeEditorProps) => {
  const [loadingDiv, setLoadingDiv] = useState<number>(1);
  const { theme } = useTheme();
  useEffect(() => {
    const codeEditorValue = () => {
      if (!code) {
        const storedCode = localStorage.getItem("code");
        handleCodeChange(storedCode ?? undefined);
      }
    };

    let intervalId: NodeJS.Timeout;

    if (isLoading) {
      intervalId = setInterval(() => {
        setLoadingDiv((prev) => (prev === 3 ? 1 : prev + 1));
      }, 1000);
    }

    codeEditorValue();
    return () => {
      clearInterval(intervalId);
    };
  }, [isLoading, handleCodeChange, code]);

  const editorRef = useRef<IStandaloneCodeEditor | null>(null);
  const handleEditorDidMount = (editor: IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  const copyText = () => {
    if (editorRef.current) {
      navigator.clipboard
        .writeText(editorRef.current.getValue())
        .then(() => {
          toast.success("Code copied to clipboard");
        })
        .catch((err) => {
          toast.error("Failed to copy code");
          console.error("Copy failed: ", err);
        });
    }
  };

  const handleEditorWillMount = (monaco: typeof import("monaco-editor")) => {
    const isDark = theme === "dark";

    if (isDark) {
      monaco.editor.defineTheme("my-dark-theme", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "comment", foreground: "6A9955", fontStyle: "italic" },
          { token: "keyword", foreground: "569CD6" },
          { token: "string", foreground: "CE9178" },
        ],
        colors: {
          "editor.background": "#060608",
          "editor.foreground": "#d4d4d4",
          "editorCursor.foreground": "#ffffff",
        },
      });
      // } else {
      monaco.editor.defineTheme("my-theme", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "comment", foreground: "008000", fontStyle: "italic" },
          { token: "keyword", foreground: "c792ea" },
          { token: "string", foreground: "ecc48d" },
        ],
        colors: {
          "editor.background": "#393947",
        },
      });
    }
  };
  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-md border border-muted/30 bg-editor-bg glass-card theme-transition">
      <div className="flex flex-row items-center justify-between h-[10%] px-3 bg-muted/20 border-b border-muted/30">
        <div className="flex space-x-1.5">
          <div
            className={`${
              isLoading && loadingDiv === 1 ? "animate-loading" : ""
            } w-3 h-3 rounded-full bg-destructive/80`}
          ></div>
          <div
            className={`${
              isLoading && loadingDiv === 2 ? "animate-loading" : ""
            } w-3 h-3 rounded-full bg-amber-500/80`}
          ></div>
          <div
            className={`${
              isLoading && loadingDiv === 3 ? "animate-loading" : ""
            } w-3 h-3 rounded-full bg-green-500/80`}
          ></div>
        </div>
        <div>main.js</div>
        <Button
          variant={"outline"}
          className="bg-transparent border border-gray-600 hover:bg-transparent"
          onClick={copyText}
        >
          copy code
        </Button>
      </div>
      <Editor
        height="90%"
        width="100%"
        defaultLanguage="javascript"
        defaultValue="// paste your code here "
        theme=// "my-dark-theme"
        {theme === "dark" ? "my-dark-theme" : "my-theme"}
        options={{
          minimap: {
            enabled: false,
          },
          fontSize: 16,
          cursorStyle: "line",
          wordWrap: "on",
        }}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
        value={code}
        onChange={handleCodeChange}
      />
    </div>
  );
};

export default CodeEditor;
