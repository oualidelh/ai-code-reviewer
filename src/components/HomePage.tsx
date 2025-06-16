"use client";
import Editor from "@monaco-editor/react";
import NavBar from "./NavBar";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <div className="bg-red-500" style={{ height: "calc(100vh - 90px)" }}>
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue="// some comment"
        />
      </div>
    </>
  );
};

export default HomePage;
