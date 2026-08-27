import { createContext, useReducer } from "react";

// Layer 3: State — holds the shared, cross-page state (who's logged in).
// Nothing here calls the API directly; the hooks layer does that and
// dispatches the result in here.

export const AuthContext = createContext(null);

const initialState = {
  user: null, // { id, username, email } | null
  initialized: false, // true once the initial /me session check has resolved
};

function authReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, initialized: true };
    case "CLEAR_USER":
      return { ...state, user: null, initialized: true };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
