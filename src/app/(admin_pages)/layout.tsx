// src/app/(admin_pages)/layout.tsx

"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

type AuthContextType = {
  user: object | null; // Replace 'object' with your actual user type if available
  loading: boolean;
};

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, loading } = useAuth() as AuthContextType;
  const router = useRouter();

  useEffect(() => {
    // Jika loading selesai dan tidak ada user, redirect ke login
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Selama loading atau jika tidak ada user, tampilkan pesan loading
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <p>Loading & Verifying Access...</p>
      </div>
    );
  }

  // Jika user ada, tampilkan halaman admin yang sebenarnya
  return <>{children}</>;
}