// AuthProvider.tsx
import React, { useState, useEffect, ReactNode } from "react";
import { AuthContext, initialUserState } from "./AuthContext";
import { UserState } from "~/types/entity_types";
import { Role, Subject } from "~/types/data_types";

interface AuthProviderProps {
  children: ReactNode;
}

const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

const getCookie = (name: string) => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; path=/; max-age=0`;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userState, setUserState] = useState<UserState>(initialUserState);
  const [isAuthenticated, setIsAuthenticated] = useState(getCookie("isAuthenticated") === "true");

  const getToken = () => getCookie("Bearer");

  const login = (userData: UserState, token: string) => {
    setIsAuthenticated(true);
    setUserState({
      id: userData.id,
      name: userData.name,
      role: userData.role?.map((role) => Role.Enum[role as keyof typeof Role.Enum]) || null,
      email: userData.email,
      year_group: userData.year_group as UserState["year_group"],
      tutoring_subjects:
        userData.tutoring_subjects?.map((subject) => Subject.Enum[subject as keyof typeof Subject.Enum]) || null,
    });
    setCookie("Bearer", token, 1);
    setCookie("user", JSON.stringify(userData), 1);
    setCookie("isAuthenticated", JSON.stringify(true), 1);
  };

  const logout = () => {
    setUserState(initialUserState);
    setIsAuthenticated(false);
    deleteCookie("Bearer");
    deleteCookie("user");
    deleteCookie("isAuthenticated");
  };

  useEffect(() => {
    const token = getToken();
    const storedUser = getCookie("user");
    const storedIsAuthenticated = getCookie("isAuthenticated");

    if (token && storedUser && storedIsAuthenticated) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(storedUser));
        setUserState(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return <AuthContext.Provider value={{ userState, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};
