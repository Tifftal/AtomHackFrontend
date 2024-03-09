import React, { createContext, useCallback, useState } from "react";
import { IAuthContext, IUser, UserProviderProps } from "./types";

const initialData: IAuthContext = {
  user: {
    name: "",
    isAuth: false,
  },
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<IAuthContext>(initialData);

export const AuthProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser>({
    name: "",
    isAuth: false,
  });

  const login = useCallback((name: string) => {
    setUser({
      name,
      isAuth: true,
    });
  }, []);

  const logout = useCallback(() => {
    setUser({
      name: "",
      isAuth: false,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
