// src/app/page.tsx (Versi Tes dengan Data Palsu)

import PortfolioClientView from '@/components/PortfolioClientView';
import type { Profile, Skill, Project } from '@/lib/types';

// Ini adalah Halaman Server, tapi kita tidak mengambil data (tidak async)
export default function HomePage() {
  
  // 1. Kita buat data palsu di sini
  const fakeProfile: Profile = {
    name: "Bagas (Nama Tes)",
    title: "Web Developer & Debugger Handal",
    bio: "Ini adalah bio yang ditampilkan dari data palsu untuk mengetes deployment.",
    cvUrl: "#",
  };

  const fakeSkills: Skill[] = [
    { id: '1', name: 'Next.js', logoUrl: 'https://cdn.worldvectorlogo.com/logos/next-js.svg' },
    { id: '2', name: 'Firebase', logoUrl: 'https://cdn.worldvectorlogo.com/logos/firebase-1.svg' },
    { id: '3', name: 'Vercel', logoUrl: 'https://static-00.iconduck.com/assets.00/vercel-icon-512x449-3422jidz.png' },
    { id: '4', name: 'TypeScript', logoUrl: 'https://cdn.worldvectorlogo.com/logos/typescript.svg' },
  ];

  const fakeProjects: Project[] = [
    {
      id: 'p1',
      title: 'Proyek Tes 1',
      description: 'Deskripsi untuk proyek tes ini untuk memastikan komponen bisa dirender dengan benar.',
      imageUrl: 'https://via.placeholder.com/600x360.png/1a202c/FFFFFF?text=Project+Image',
      projectUrl: '#',
    },
  ];

  // 2. Lemparkan data palsu ke Client Component
  return (
    <PortfolioClientView 
      profile={fakeProfile}
      skills={fakeSkills}
      projects={fakeProjects}
    />
  );
}