"use client";
import React from "react";
import { LANGUAGE_VERSIONS } from "../constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <div className="flex items-center">
      <p className="mr-2 text-gray-300">Language:</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="px-2 py-1 flex items-center gap-1 text-white hover:bg-gray-800">
            {language}
            <ChevronDown className="h-4 w-4 opacity-70" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-900 border border-gray-700 text-white w-40">
          {languages.map(([lang, version]) => (
            <DropdownMenuItem
              key={lang}
              onClick={() => onSelect(lang)}
              className={`flex items-center justify-between px-3 py-2 hover:bg-gray-800 focus:bg-gray-800 cursor-pointer ${
                lang === language ? "text-blue-400 bg-gray-800" : "text-white"
              }`}
            >
              <span>{lang}</span>
              <span className="text-gray-500 text-xs">{version}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSelector;