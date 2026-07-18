'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  userId: string;
  identifier: string; // Email or Phone
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  sheetsConnected: boolean;
  login: (identifier: string, password: string) => Promise<boolean>;
  register: (identifier: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Safe SHA-256 string hashing using browser Web Crypto API
async function hashPassword(password: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sheetsConnected, setSheetsConnected] = useState(false);

  useEffect(() => {
    // Load user session on mount
    try {
      const stored = localStorage.getItem('productlens_user_session');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }

    // Check if sheets webhook is active in backend config
    checkSheetsConfig();
  }, []);

  const checkSheetsConfig = async () => {
    try {
      const res = await fetch('/api/auth?check=config');
      const data = await res.json();
      setSheetsConnected(!!data.sheetsConnected);
    } catch (err) {
      setSheetsConnected(false);
    }
  };

  const login = async (identifier: string, password: string): Promise<boolean> => {
    setError(null);
    setLoading(true);

    try {
      const passwordHash = await hashPassword(password);
      
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          identifier: identifier.trim(),
          passwordHash
        })
      });
      const data = await res.json();

      if (data.success && data.userId) {
        const loggedUser = { userId: data.userId, identifier: data.identifier };
        setUser(loggedUser);
        localStorage.setItem('productlens_user_session', JSON.stringify(loggedUser));
        setLoading(false);
        return true;
      } else {
        throw new Error(data.error || 'Invalid credentials');
      }
    } catch (err: any) {
      setError(err.message || 'Login connection failed');
      setLoading(false);
      return false;
    }
  };

  const register = async (identifier: string, password: string): Promise<boolean> => {
    setError(null);
    setLoading(true);

    try {
      const passwordHash = await hashPassword(password);

      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'register',
          identifier: identifier.trim(),
          passwordHash
        })
      });
      const data = await res.json();

      if (data.success && data.userId) {
        const loggedUser = { userId: data.userId, identifier: data.identifier };
        setUser(loggedUser);
        localStorage.setItem('productlens_user_session', JSON.stringify(loggedUser));
        setLoading(false);
        return true;
      } else {
        throw new Error(data.error || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.message || 'Registration connection failed');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('productlens_user_session');
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, sheetsConnected, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
