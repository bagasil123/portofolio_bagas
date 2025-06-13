// src/context/AuthContext.tsx (Versi Final yang Benar)

"use client"; // Diperlukan karena kita menggunakan Hooks

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// 1. Definisikan "bentuk" atau "interface" dari data di dalam context
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

// 2. Berikan tipe tersebut saat membuat context.
//    Kita beri nilai awal 'undefined' untuk penanganan error yang lebih baik.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Hook custom untuk menggunakan context, sekarang dengan pengecekan error
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// 4. Komponen Provider yang akan "membungkus" aplikasi kita
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = { user, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};