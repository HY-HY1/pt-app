// AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios, { AxiosResponse } from 'axios';

interface AuthContextProps {
  user: User['user'] | null;
  authenticated: boolean;
  loading: boolean;
  error: string | null;
  authenticate: () => Promise<{ authenticated: boolean }>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User['user'] | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const authenticate = async (): Promise<{ authenticated: boolean }> => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuthenticated(false);
        return { authenticated: false };
      }

      const response: AxiosResponse<UserResponse> = await axios.get(
        "http://localhost:4000/auth/account",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      const data = response.data;
      setUser(data.user);
      setAuthenticated(true);
      return { authenticated: true };
    } catch (error) {
      setError("User Unauthorized");
      setAuthenticated(false);
      return { authenticated: false };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Automatically call authenticate on mount to check if user is already logged in
    authenticate();
  }, []);

  return (
    <AuthContext.Provider value={{ user, authenticated, loading, error, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
