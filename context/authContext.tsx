import React, { createContext, PropsWithChildren, useState } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  setLoggedIn: (isLoggedIn: boolean) => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
