import { createContext, useState, type JSX } from "react";
import type { AuthInfo } from "../types/user";

interface AuthContextType {
  auth: AuthInfo | undefined;
  setAuth: React.Dispatch<React.SetStateAction<AuthInfo | undefined>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

  const [auth, setAuth] = useState<AuthInfo | undefined>(undefined);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
