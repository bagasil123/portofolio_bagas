// src/app/page.tsx (VERSI FINAL DENGAN TYPESCRIPT YANG BENAR)

import { db } from '../../lib/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import Scene3D from '../../lib/components/Scene3D';

// =======================================================
// 1. DEFINISIKAN TIPE DATA (INTERFACE) DI SINI
// =======================================================
interface Profile {
  name?: string;
  title?: string;
  bio?: string;
  cvUrl?: string;
}

interface Skill {
  id: string;
  name: string;
  logoUrl: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
}

// =======================================================
// 2. GUNAKAN INTERFACE PADA KOMPONEN
// =======================================================
function Hero({ profile }: { profile: Profile }) {
    return (
        <div className="text-center py-20">
            <h1 className="text-5xl font-bold">{profile.name || 'Nama Anda'}</h1>
            <p className="text-xl mt-2">{profile.title || 'Title Anda'}</p>
            <p className="mt-4 max-w-2xl mx-auto">{profile.bio || 'Bio Anda'}</p>
            {profile.cvUrl && (
                <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Download CV
                </a>
            )}
        </div>
    )
}

function Skills({ skills }: { skills: Skill[] }) {
    return (
        <div className="py-20">
            <h2 className="text-3xl font-bold text-center mb-8">My Skills</h2>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-4xl mx-auto">
                {skills.map((skill) => (
                     <div key={skill.id} className="flex flex-col items-center p-4 bg-gray-800 rounded-lg transition-transform hover:scale-110">
                        <Image src={skill.logoUrl} alt={skill.name} width={64} height={64} style={{ objectFit: 'contain' }}/>
                        <p className="mt-2 text-center">{skill.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

function Projects({ projects }: { projects: Project[] }) {
    return (
        <div className="py-20">
             <h2 className="text-3xl font-bold text-center mb-8">My Projects</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {projects.map(project => (
                    <div key={project.id} className="bg-gray-800 rounded-lg overflow-hidden group">
                        <div className="overflow-hidden">
                            <Image 
                                src={project.imageUrl} 
                                alt={project.title} 
                                width={600} 
                                height={360} 
                                className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold">{project.title}</h3>
                            <p className="mt-2 text-gray-400 h-24 overflow-hidden">{project.description}</p>
                            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-blue-400 hover:text-blue-300 font-semibold">
                                View Project &rarr;
                            </a>
                        </div>
                    </div>
                ))}
             </div>
        </div>
    )
}


export default async function HomePage() {
  const profileDoc = await getDoc(doc(db, 'profile', 'main'));
  const profile: Profile = profileDoc.data() || {};

  const skillsSnapshot = await getDocs(collection(db, 'skills'));
  const skills: Skill[] = skillsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Skill));

  const projectsSnapshot = await getDocs(collection(db, 'projects'));
  const projects: Project[] = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));

  return (
    <div className="bg-gray-900 text-white min-h-screen relative">
      <Scene3D />
      <main className="container mx-auto px-4 relative z-10">
        <Hero profile={profile} />
        <Skills skills={skills} />
        <Projects projects={projects} />
      </main>
    </div>
  );
}