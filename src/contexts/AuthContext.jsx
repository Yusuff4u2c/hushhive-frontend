import { createContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext({
  user: null,
  signUserIntoApp: () => {},
  signUserOutOfApp: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signUserIntoApp = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const signUserOutOfApp = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const contextValue = useMemo(
    () => ({ user, signUserIntoApp, signUserOutOfApp }),
    [user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
