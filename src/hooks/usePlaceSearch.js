import { useEffect, useRef, useState } from "react";
import { fetchPlaceSuggestions } from "../services/weatherApi";

export default function usePlaceSearch(defaultQuery = "Beirut") {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState(defaultQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchingPlaces, setSearchingPlaces] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const searchBoxRef = useRef(null);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (input.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      setSearchingPlaces(true);

      try {
        const results = await fetchPlaceSuggestions(input.trim());
        setSuggestions(results);
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
      } finally {
        setSearchingPlaces(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [input]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    setSelectedPlace(null);
    setQuery(input.trim());
    setSuggestions([]);
    setShowSuggestions(false);
  }

  function handleSuggestionClick(place) {
    const formatted = [place.name, place.country].filter(Boolean).join(", ");

    setInput(formatted);
    setSelectedPlace(place);
    setQuery(formatted);
    setSuggestions([]);
    setShowSuggestions(false);
  }

  return {
    input,
    setInput,
    query,
    setQuery,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    searchingPlaces,
    selectedPlace,
    setSelectedPlace,
    searchBoxRef,
    handleSubmit,
    handleSuggestionClick,
  };
}