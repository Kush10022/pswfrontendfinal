import React from "react";
import { SearchBar } from "./SearchBar";
import ResultBox from "./ResultBox";

export default function Search() {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* Search bar component */}
      <div className="h-20 flex-shrink-0">
        <SearchBar />
      </div>

      {/* Search results component */}
      <div className="flex-1 mt-3">
        <ResultBox />
      </div>
    </div>
  );
}
