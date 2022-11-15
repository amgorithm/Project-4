import React from "react";

const initialState = {
  user: null,
};

export const UserContext = React.createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, setState] = React.useState(initialState);
  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};
