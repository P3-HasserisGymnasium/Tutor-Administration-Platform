// AuthProvider.tsx
import React, { useState, useEffect, ReactNode } from "react";
import { AuthContext, initialUserState } from "./AuthContext";
import { UserState } from "~/types/entity_types";
import { Role, Subject } from "~/types/data_types";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userState, setUserState] = useState<UserState>(initialUserState);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Helper to get the Bearer token
  const getToken = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("Bearer="))
      ?.split("=")[1];
  };

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
    document.cookie = `Bearer=${token}; path=/; max-age=1800;`;
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUserState(initialUserState);
    setIsAuthenticated(false);
    document.cookie = "Bearer=; path=/; max-age=0;";
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const token = getToken();
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUserState(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []); // Run once when the component mounts

  return <AuthContext.Provider value={{ userState, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};
