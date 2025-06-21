import React from "react";
import { Button } from "./ui/button";

type CodeRevButton = {
  isLoading: boolean;
  handleFetchReview(): Promise<void>;
};

const CodeRevButton = ({ isLoading, handleFetchReview }: CodeRevButton) => {
  return (
    <div className="flex justify-center mt-6">
      <Button
        onClick={handleFetchReview}
        className="my-6 px-8 py-6 font-medium text-base bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25 transition-all duration-200 neomorphism"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <svg
              className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Reviewing...
          </div>
        ) : (
          <span>Review Code</span>
        )}
      </Button>
    </div>
  );
};

export default CodeRevButton;
