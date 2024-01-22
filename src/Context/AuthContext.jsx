import React, { createContext, useContext } from "react";

export const AuthContext = createContext(undefined);

export function useAuthContext() {
  const currentUser = useContext(AuthContext);

  if (currentUser === undefined) {
    return new Error("Current user is undefined please provide a provider");
  }

  return currentUser;
}
