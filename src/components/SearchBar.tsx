
import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getCitySuggestions } from "@/utils/weatherApi";

interface SearchBarProps {
  onCitySelect: (city: string) => void;
}

export function SearchBar({ onCitySelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length >= 2) {
        const results = await getCitySuggestions(query);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
        setSelectedIndex(-1); // Reset selection when suggestions change
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const timer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onCitySelect(query);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city: string) => {
    setQuery(city);
    onCitySelect(city);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;
    
    // Down arrow
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    }
    // Up arrow
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
    }
    // Enter key
    else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const selectedCity = suggestions[selectedIndex];
      setQuery(selectedCity);
      onCitySelect(selectedCity);
      setShowSuggestions(false);
    }
    // Escape key
    else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex">
        <div className="relative flex-grow">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pr-10 rounded-r-none border-r-0"
            onFocus={() => {
              if (suggestions.length > 0) setShowSuggestions(true);
            }}
          />
          {query && (
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setQuery("")}
            >
              &times;
            </button>
          )}
        </div>
        <Button
          type="submit"
          className="rounded-l-none bg-primary hover:bg-primary/90"
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>

      {showSuggestions && (
        <div
          ref={suggestionRef}
          className="absolute z-10 mt-1 w-full bg-card border border-border rounded-md shadow-lg max-h-60 overflow-auto"
        >
          <ul className="py-1">
            {suggestions.map((city, index) => (
              <li
                key={index}
                className={`px-4 py-2 cursor-pointer ${
                  index === selectedIndex
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => handleSuggestionClick(city)}
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
