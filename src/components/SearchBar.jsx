import { MapPin, Search } from "lucide-react";
import PropTypes from "prop-types";
import { useSearchContext } from "../context/SearchContext";

export default function SearchBar({ weather }) {
  const {
    input,
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
  } = useSearchContext();

  return (
    <header className="topbar">
      <div className="brand-wrap">
        <div className="brand">Weatherly</div>
        <div className="location-chip">
          <MapPin size={16} aria-hidden="true" />
          <span>
            {weather ? `${weather.city}, ${weather.country}` : "Loading..."}
          </span>
        </div>
      </div>

      <div className="searchbox-wrap" ref={searchBoxRef}>
        <form className="searchbar" onSubmit={handleSubmit}>
          <Search size={18} className="search-icon" aria-hidden="true" />
          <input
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={handleInputFocus}
            onKeyDown={handleInputKeyDown}
            placeholder="Search Location"
            aria-label="Search location"
            aria-expanded={showSuggestions}
            aria-controls="location-suggestion-list"
            aria-autocomplete="list"
            role="combobox"
          />
          <button type="submit" className="search-btn" aria-label="Search location">
            Search
          </button>
        </form>

        {showSuggestions && (input.trim().length >= 2 || searchingPlaces || placeSearchError) && (
          <div
            id="location-suggestion-list"
            className="suggestions-dropdown"
            role="listbox"
            aria-label="Location suggestions"
          >
            {searchingPlaces ? (
              <div className="suggestion-item muted">Searching places...</div>
            ) : placeSearchError ? (
              <div className="suggestion-item muted">{placeSearchError}</div>
            ) : suggestions.length > 0 ? (
              suggestions.map((place, index) => (
                <button
                  key={place.id}
                  type="button"
                  className={`suggestion-item ${
                    activeSuggestionIndex === index ? "suggestion-item-active" : ""
                  }`}
                  onClick={() => handleSuggestionClick(place)}
                  role="option"
                  aria-selected={activeSuggestionIndex === index}
                  aria-label={`${place.name}, ${[place.admin1, place.country]
                    .filter(Boolean)
                    .join(", ")}`}
                >
                  <MapPin size={15} aria-hidden="true" />
                  <div className="suggestion-text">
                    <div className="suggestion-main">{place.name}</div>
                    <div className="suggestion-sub">
                      {[place.admin1, place.country].filter(Boolean).join(", ")}
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="suggestion-item muted">No matching places found</div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

SearchBar.propTypes = {
  weather: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
  }),
};