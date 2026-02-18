"use client";

import { useEffect, useState, useCallback } from "react";
import { User } from "@/types";
import { getStoredUser, getStoredToken } from "@/lib/api";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loadAuthState = useCallback(() => {
    const storedUser = getStoredUser();
    const storedToken = getStoredToken();
    
    setUser(storedUser);
    setToken(storedToken);
    setIsAuthenticated(!!(storedUser && storedToken));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadAuthState();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "authToken" || e.key === "user") {
        loadAuthState();
      }
    };
    const handleAuthChange = () => {
      loadAuthState();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, [loadAuthState]);

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    refetch: loadAuthState,
  };
}
