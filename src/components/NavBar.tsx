import { useTheme } from "@/context/themeContext";
import { CodeXml, SunMoon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const NavBar = () => {
  const { toggleTheme } = useTheme();
  return (
    <div className="flex items-center justify-between fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border z-10  p-3 h-[70px] w-full theme-transition">
      <div className="flex items-center flex-row gap-1">
        <CodeXml color="#251881" />
        <h1 className="font-bold text-lg ">AI Code Reviewer</h1>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full cursor-pointer h-11 w-11"
        aria-label="Toggle theme"
      >
        <SunMoon />
      </Button>
    </div>
  );
};

export default NavBar;
