import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import ResultBox from "./ResultBox";
import { useAtom } from "jotai";
import { pswAtom } from "../atoms";
import NoSearchResultPlaceholder from "./NoSearchResultPlaceholder"; // Import the placeholder for empty search
import WelcomePlaceholder from "./WelcomePlaceholder"; // Import the new welcome placeholder

export default function Search() {
  const [psws] = useAtom(pswAtom);
  const [hasSearched, setHasSearched] = useState(false); // Track if a search has been performed

  const searchPerformed = () => {
    setHasSearched(true);
  };

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* Search bar component */}
      <div className="flex-shrink-0">
        <SearchBar onSearch={searchPerformed} />
      </div>

      {/* Search results component (scrollable within the container) */}
      <div className="flex-1 overflow-y-auto mt-3">
        {/* If the user hasn't searched, show the welcome placeholder */}
        {!hasSearched ? (
          <div className="mt-10">
          <WelcomePlaceholder />
          </div>
        ) : (
          <>
            {/* If the user has searched and no results, show empty */}
            {!psws || psws.length === 0 ? (
              <NoSearchResultPlaceholder />
            ) : (
              <ResultBox />
            )}
          </>
        )}
      </div>
    </div>
  );
}
