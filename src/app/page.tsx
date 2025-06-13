// src/app/page.tsx (Versi Detektif dengan console.log)

import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import PortfolioClientView from '@/components/PortfolioClientView';
import type { Profile, Skill, Project } from '@/lib/types';

export default async function HomePage() {
  console.log("Memulai proses render HomePage di server...");

  try {
    console.log("Mencoba mengambil data profile...");
    const profileDoc = await getDoc(doc(db, 'profile', 'main'));
    const profile = (profileDoc.data() || {}) as Profile;
    console.log("✅ BERHASIL mengambil data profile.");

    console.log("Mencoba mengambil data skills...");
    const skillsSnapshot = await getDocs(collection(db, 'skills'));
    const skills = skillsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Skill[];
    console.log("✅ BERHASIL mengambil data skills. Jumlah:", skills.length);

    console.log("Mencoba mengambil data projects...");
    const projectsSnapshot = await getDocs(collection(db, 'projects'));
    const projects = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Project[];
    console.log("✅ BERHASIL mengambil data projects. Jumlah:", projects.length);

    console.log("Semua data berhasil diambil. Melempar ke Client Component...");

    return (
      <PortfolioClientView 
        profile={profile}
        skills={skills}
        projects={projects}
      />
    );

  } catch (error) {
    console.error("❌ TERJADI ERROR FATAL SAAT PENGAMBILAN DATA:", error);
    // Tampilkan pesan error jika build gagal mengambil data
    return <div>Terjadi kesalahan saat memuat data portofolio. Silakan coba lagi nanti.</div>;
  }
}