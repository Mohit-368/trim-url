import { createContext, useReducer } from "react";

export const LinksContext = createContext(null);

const initialState = {
  links: [],
  status: "idle", // idle | loading | success | error
  error: null,
};

function linksReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, status: "loading", error: null };
    case "FETCH_SUCCESS":
      return { ...state, status: "success", links: action.payload };
    case "FETCH_ERROR":
      return { ...state, status: "error", error: action.payload };
    case "ADD_LINK":
      return { ...state, links: [action.payload, ...state.links] };
    case "REMOVE_LINK":
      return {
        ...state,
        links: state.links.filter((link) => link._id !== action.payload),
      };
    default:
      return state;
  }
}

export function LinksProvider({ children }) {
  const [state, dispatch] = useReducer(linksReducer, initialState);

  return (
    <LinksContext.Provider value={{ state, dispatch }}>
      {children}
    </LinksContext.Provider>
  );
}
