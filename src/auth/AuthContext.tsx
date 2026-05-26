import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getStorageItem, setStorageItem, deleteStorageItem } from '../utils/storage';
import { User } from '../types';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (user: User) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

const USER_KEY = 'jiva_user';
const AUTH_KEY = 'jiva_auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const stored = await getStorageItem(USER_KEY);
        if (stored) setUser(JSON.parse(stored));
      } catch {
        // no stored user
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    const u: User = {
      id: '1',
      name: email.split('@')[0],
      email,
    };
    await setStorageItem(USER_KEY, JSON.stringify(u));
    await setStorageItem(AUTH_KEY, 'token');
    setUser(u);
  }, []);

  const signup = useCallback(async (newUser: User) => {
    await setStorageItem(USER_KEY, JSON.stringify(newUser));
    await setStorageItem(AUTH_KEY, 'token');
    setUser(newUser);
  }, []);

  const logout = useCallback(async () => {
    await deleteStorageItem(USER_KEY);
    await deleteStorageItem(AUTH_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
