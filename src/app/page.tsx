// src/app/page.tsx

import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import PortfolioClientView from '@/components/PortfolioClientView';
// Impor tipe dari file terpusat
import type { Profile, Skill, Project } from '@/lib/types';

export default async function HomePage() {
  // Ambil data dari Firestore
  const profileDoc = await getDoc(doc(db, 'profile', 'main'));
  const skillsSnapshot = await getDocs(collection(db, 'skills'));
  const projectsSnapshot = await getDocs(collection(db, 'projects'));

  // Gunakan 'as' untuk memberitahu TypeScript bentuk data yang benar
  const profile = (profileDoc.data() || {}) as Profile;

  const skills = skillsSnapshot.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data() 
  })) as Skill[];

  const projects = projectsSnapshot.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data() 
  })) as Project[];

  // Lemparkan data yang sudah 'type-safe' ke Client Component
  return (
    <PortfolioClientView 
      profile={profile}
      skills={skills}
      projects={projects}
    />
  );
}