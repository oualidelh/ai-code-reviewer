import React from "react";
import { options } from "@/lib/languageOptions";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LanguageSelectProps {
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

const LanguageSelect = ({
  selectedOption,
  setSelectedOption,
}: LanguageSelectProps) => {
  return (
    <div>
      <Select onValueChange={setSelectedOption} value={selectedOption}>
        <SelectTrigger className="w-[180px] border border-gray-600 bg-editor-headerItems font-semibold">
          <SelectValue placeholder="Select a Coding Language" />
        </SelectTrigger>
        <SelectContent className="h-[220px] ">
          <SelectGroup>
            <SelectLabel>Languages</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelect;
