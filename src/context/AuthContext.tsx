import { createContext } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
});
