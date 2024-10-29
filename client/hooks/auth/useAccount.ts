// useAccount.ts

import { useContext } from 'react';
import AuthContext from '@/context/auth/accountContext';

export const useAccount = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAccount must be used within an AuthProvider");
  }
  return context;
};
