import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  accessToken: string;
};

type AuthContextType = {
  auth: User | null;
  setAuth: React.Dispatch<React.SetStateAction<User | null>>;
};

const authContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [auth, setAuth] = useState<User | null>(null);

  // For persisting the loggedIn user info in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("auth");
    if (storedUser) {
      setAuth(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthContextProvider.");
  }

  return context;
};
