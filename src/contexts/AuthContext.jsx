import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  loading: false,
  user: null,
  signUserIntoApp: () => {},
  signUserOutOfApp: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const signUserIntoApp = (user) => {
    setUser(user);
    // window.localStorage.setItem("user", JSON.stringify(user));
  };

  const signUserOutOfApp = () => {
    setUser(null);
    // window.localStorage.removeItem("user");
  };

  // useEffect(() => {
  //   const persistedUser = window.localStorage.getItem("user");
  //   if (persistedUser) {
  //     setUser(JSON.parse(persistedUser));
  //   }
  // }, []);

  useEffect(() => {
    // loading should be true
    setLoading(true);
    const unSubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) signUserIntoApp(user);
      else signUserOutOfApp;

      // loading should be false
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        signUserOutOfApp,
        signUserIntoApp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
