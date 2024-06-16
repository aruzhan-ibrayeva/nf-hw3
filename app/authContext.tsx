// app/authContext.tsx
'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from './axiosInstance';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userString = localStorage.getItem('user');
    console.log('AuthProvider: Retrieved token =', token);
    console.log('AuthProvider: Retrieved userString =', userString);
    if (token && userString) {
      try {
        const user = JSON.parse(userString);
        setIsAuthenticated(true);
        setUser(user);
        console.log('AuthProvider: Parsed user =', user);
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        setIsAuthenticated(false);
        setUser(null);
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    setIsAuthenticated(true);
    setUser(user);
    console.log('AuthProvider: Logged in with token =', token);
    console.log('AuthProvider: Stored user =', user);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
    console.log('AuthProvider: Logged out');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
