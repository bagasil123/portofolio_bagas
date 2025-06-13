// src/app/layout.tsx (SESUDAH)
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext"; // Sesuaikan path jika perlu

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portofolio Bagas", // Ganti judulnya juga sekalian
  description: "Portofolio keren dibuat dengan Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}