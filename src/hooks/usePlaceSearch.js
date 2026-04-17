import { useEffect, useRef, useState } from "react";
import { fetchPlaceSuggestions } from "../services/weatherApi";

const DEFAULT_QUERY = "Beirut";
const SEARCH_DEBOUNCE_MS = 300;

/**
 * input = what's shown in the text field
 * query = the submitted search term actually used for weather fetching
 */
export default function usePlaceSearch(defaultQuery = DEFAULT_QUERY) {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState(defaultQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchingPlaces, setSearchingPlaces] = useState(false);
  const [placeSearchError, setPlaceSearchError] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const searchBoxRef = useRef(null);

  useEffect(() => {
    if (!isTyping || input.trim().length < 2) {
      setSuggestions([]);
      setPlaceSearchError("");
      return;
    }

    const controller = new AbortController();

    const delay = setTimeout(async () => {
      setSearchingPlaces(true);
      setPlaceSearchError("");

      try {
        const results = await fetchPlaceSuggestions(input.trim(), controller.signal);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (err) {
        if (err.name === "AbortError") return;
        setSuggestions([]);
        setPlaceSearchError("Could not load place suggestions");
        setShowSuggestions(true);
      } finally {
        if (!controller.signal.aborted) {
          setSearchingPlaces(false);
        }
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      clearTimeout(delay);
      controller.abort();
    };
  }, [input, isTyping]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsTyping(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleInputChange(value) {
    setInput(value);
    setSelectedPlace(null);
    setIsTyping(true);
  }

  function handleInputFocus() {
    if ((suggestions.length > 0 || placeSearchError) && input.trim().length >= 2) {
      setShowSuggestions(true);
    }
    setIsTyping(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    setSelectedPlace(null);
    setQuery(input.trim());
    setSuggestions([]);
    setPlaceSearchError("");
    setShowSuggestions(false);
    setIsTyping(false);
  }

  function handleSuggestionClick(place) {
    const formatted = [place.name, place.country].filter(Boolean).join(", ");

    setInput(formatted);
    setSelectedPlace(place);
    setQuery(formatted);
    setSuggestions([]);
    setPlaceSearchError("");
    setShowSuggestions(false);
    setIsTyping(false);
  }

  return {
    searchState: {
      input,
      suggestions,
      showSuggestions,
      searchingPlaces,
      placeSearchError,
      searchBoxRef,
    },
    searchActions: {
      handleInputChange,
      handleInputFocus,
      setShowSuggestions,
      handleSubmit,
      handleSuggestionClick,
    },
    query,
    selectedPlace,
  };
}