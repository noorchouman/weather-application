import { createContext, useContext } from "react";
import PropTypes from "prop-types";

const SearchContext = createContext(null);

export function SearchProvider({ value, children }) {
  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

SearchProvider.propTypes = {
  value: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export function useSearchContext() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearchContext must be used within SearchProvider");
  }

  return context;
}