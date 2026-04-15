import { MapPin, Search } from "lucide-react";

export default function SearchBar({
  input,
  setInput,
  handleSubmit,
  suggestions,
  showSuggestions,
  setShowSuggestions,
  searchingPlaces,
  handleSuggestionClick,
  searchBoxRef,
  weather,
  setSelectedPlace,
}) {
  return (
    <header className="topbar">
      <div className="brand-wrap">
        <div className="brand">Weatherly</div>
        <div className="location-chip">
          <MapPin size={16} />
          <span>
            {weather ? `${weather.city}, ${weather.country}` : "Loading..."}
          </span>
        </div>
      </div>

      <div className="searchbox-wrap" ref={searchBoxRef}>
        <form className="searchbar" onSubmit={handleSubmit}>
          <Search size={18} className="search-icon" />
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setSelectedPlace(null);
            }}
            onFocus={() => {
              if (suggestions.length > 0) setShowSuggestions(true);
            }}
            placeholder="Search Location"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

        {showSuggestions && (input.trim().length >= 2 || searchingPlaces) && (
          <div className="suggestions-dropdown">
            {searchingPlaces ? (
              <div className="suggestion-item muted">Searching places...</div>
            ) : suggestions.length > 0 ? (
              suggestions.map((place) => (
                <button
                  key={place.id}
                  type="button"
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(place)}
                >
                  <MapPin size={15} />
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