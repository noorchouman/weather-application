import { useCallback, useEffect, useRef, useState } from "react";
import {
  FALLBACK_CITY,
  GEOLOCATION_TIMEOUT_MS,
  LOCAL_STORAGE_CITY_KEY,
  SEARCH_DEBOUNCE_MS,
} from "../config/constants";
import { fetchPlaceSuggestions } from "../services/weatherApi";

function getStoredCity() {
  return localStorage.getItem(LOCAL_STORAGE_CITY_KEY) || FALLBACK_CITY;
}

/**
 * input = what's shown in the text field
 * query = the submitted search term actually used for weather fetching
 */
export default function usePlaceSearch() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState(getStoredCity);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchingPlaces, setSearchingPlaces] = useState(false);
  const [placeSearchError, setPlaceSearchError] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const searchBoxRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CITY_KEY, query);
  }, [query]);

  useEffect(() => {
    if (!navigator.geolocation) return;
    if (localStorage.getItem(LOCAL_STORAGE_CITY_KEY)) return;

    let cancelled = false;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (cancelled) return;

        const { latitude, longitude } = position.coords;

        setSelectedPlace({
          id: `geo-${latitude}-${longitude}`,
          name: "Current Location",
          country: "",
          admin1: "",
          latitude,
          longitude,
        });
        setQuery("Current Location");
      },
      () => {
        // fall back silently
      },
      {
        enableHighAccuracy: false,
        timeout: GEOLOCATION_TIMEOUT_MS,
        maximumAge: 60000,
      }
    );

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isTyping || input.trim().length < 2) {
      setSuggestions([]);
      setPlaceSearchError("");
      setActiveSuggestionIndex(-1);
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
        setActiveSuggestionIndex(results.length > 0 ? 0 : -1);
      } catch (err) {
        if (err.name === "AbortError") return;
        setSuggestions([]);
        setPlaceSearchError("Could not load place suggestions");
        setShowSuggestions(true);
        setActiveSuggestionIndex(-1);
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

  const handleClickOutside = useCallback((event) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
      setShowSuggestions(false);
      setIsTyping(false);
      setActiveSuggestionIndex(-1);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  function commitSuggestion(place) {
    const formatted = [place.name, place.country].filter(Boolean).join(", ");

    setInput(formatted);
    setSelectedPlace(place);
    setQuery(formatted);
    setSuggestions([]);
    setPlaceSearchError("");
    setShowSuggestions(false);
    setIsTyping(false);
    setActiveSuggestionIndex(-1);
  }

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
    setActiveSuggestionIndex(-1);
  }

  function handleSuggestionClick(place) {
    commitSuggestion(place);
  }

  function handleInputKeyDown(event) {
    if (!showSuggestions && event.key === "ArrowDown" && suggestions.length > 0) {
      setShowSuggestions(true);
      setActiveSuggestionIndex(0);
      return;
    }

    if (!showSuggestions) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveSuggestionIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveSuggestionIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    }

    if (
      event.key === "Enter" &&
      activeSuggestionIndex >= 0 &&
      suggestions[activeSuggestionIndex]
    ) {
      event.preventDefault();
      commitSuggestion(suggestions[activeSuggestionIndex]);
    }

    if (event.key === "Escape") {
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    }
  }

  return {
    input,
    query,
    selectedPlace,
    suggestions,
    showSuggestions,
    searchingPlaces,
    placeSearchError,
    activeSuggestionIndex,
    searchBoxRef,
    handleInputChange,
    handleInputFocus,
    handleInputKeyDown,
    handleSubmit,
    handleSuggestionClick,
  };
}