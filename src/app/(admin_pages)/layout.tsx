// src/app/(admin_pages)/layout.tsx (Pengganti ProtectedAdminRoute.js)
"use client";
 // Layout ini perlu hooks, jadi harus client component
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation"; // Gunakan dari 'next/navigation'
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Jika loading selesai dan tidak ada user, redirect ke login
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Selama loading atau jika tidak ada user, tampilkan pesan loading
  // untuk mencegah kilasan konten yang dilindungi
  if (loading || !user) {
    return <div>Loading access...</div>;
  }

  // Jika user ada, tampilkan halaman admin yang sebenarnya
  return <>{children}</>;
}