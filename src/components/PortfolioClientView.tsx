// src/components/PortfolioClientView.tsx
"use client";

import Image from 'next/image';
import Scene3D from '@/components/3d/Scene3D';
import type { Profile, Skill, Project } from '@/lib/types';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface PortfolioViewProps {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
}

// ===============================================
// Definisikan varian animasi untuk Framer Motion
// ===============================================
const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};


// ===============================================
// Sub-komponen yang sudah didesain ulang
// ===============================================

function Hero({ profile }: { profile: Profile }) {
    return (
        <motion.div 
            className="min-h-screen flex flex-col items-center justify-center text-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                {profile.name || 'Nama Anda'}
            </h1>
            <p className="text-xl md:text-2xl mt-4 text-neutral-300">
                {profile.title || 'Title Anda'}
            </p>
            <p className="mt-6 max-w-2xl mx-auto text-neutral-400">
                {profile.bio || 'Bio Anda'}
            </p>
            {profile.cvUrl && (
                <motion.a 
                    href={profile.cvUrl} target="_blank" rel="noopener noreferrer" 
                    className="mt-8 inline-block bg-white text-black px-6 py-3 rounded-full font-bold transition-transform hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Download CV
                </motion.a>
            )}
        </motion.div>
    )
}

function Skills({ skills }: { skills: Skill[] }) {
    return (
        <section className="py-20">
            <h2 className="text-4xl font-bold text-center mb-12">My Skills</h2>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-4xl mx-auto">
                {skills.map((skill, index) => (
                    <motion.div 
                        key={skill.id} 
                        className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm"
                        variants={fadeInAnimationVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        custom={index}
                    >
                        <Image src={skill.logoUrl} alt={skill.name} width={64} height={64} style={{ objectFit: 'contain' }}/>
                        <p className="mt-4 text-center font-semibold text-neutral-300">{skill.name}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

function Projects({ projects }: { projects: Project[] }) {
    return (
        <section className="py-20">
             <h2 className="text-4xl font-bold text-center mb-12">My Projects</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {projects.map((project, index) => (
                    <motion.div 
                        key={project.id} 
                        className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm group"
                        variants={fadeInAnimationVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        custom={index}
                    >
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
                            <p className="mt-2 text-neutral-400 text-sm h-20 overflow-hidden">{project.description}</p>
                            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold group">
                                View Project <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/>
                            </a>
                        </div>
                    </motion.div>
                ))}
             </div>
        </section>
    )
}

// ===============================================
// Komponen Utama Pembungkus
// ===============================================
export default function PortfolioClientView({ profile, skills, projects }: PortfolioViewProps) {
  return (
    <div className="bg-neutral-950 text-white min-h-screen selection:bg-blue-500/50">
      <Scene3D />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-950"></div>
      <main className="container mx-auto px-4 relative z-10">
        <Hero profile={profile} />
        <Skills skills={skills} />
        <Projects projects={projects} />
      </main>
    </div>
  );
}