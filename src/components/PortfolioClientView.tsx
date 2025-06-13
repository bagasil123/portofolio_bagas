// src/components/PortfolioClientView.tsx
"use client";

import Image from 'next/image';
import Scene3D from '@/components/3d/Scene3D';
import type { Profile, Skill, Project } from '@/lib/types';
import { motion, Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { theme } from '@/styles/theme';

interface PortfolioViewProps {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
}

// Beri tipe pada varian animasi kita untuk keamanan maksimal
const fadeInAnimationVariants: Variants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
      duration: 0.5,
    },
  }),
};

const cardHoverVariants: Variants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
      <motion.h1
        className="text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300 py-2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {profile.name || 'Nama Anda'}
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl mt-4 text-gray-300"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {profile.title || 'Title Anda'}
      </motion.p>
      <motion.p
        className="mt-6 max-w-2xl mx-auto text-gray-400"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        {profile.bio || 'Bio Anda'}
      </motion.p>
      {profile.cvUrl && (
        <motion.a
          href={profile.cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block bg-[color:theme(accent)] text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg"
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(255, 147, 22, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Lihat CV Saya
        </motion.a>
      )}
    </section>
  );
}

function Skills({ skills }: { skills: Skill[] }) {
  return (
    <section className="py-24">
      <h2 className="text-4xl font-bold text-center mb-16 text-white">Teknologi & Tools</h2>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            className="flex flex-col items-center justify-center p-4 bg-gray-800/50 rounded-xl backdrop-blur-md border border-gray-700 transition-all duration-300 hover:bg-gray-700/70"
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
            whileHover={cardHoverVariants.hover}
          >
            <Image src={skill.logoUrl} alt={skill.name} width={64} height={64} className="object-contain" />
            <p className="mt-4 text-center font-medium text-gray-300 text-sm">{skill.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Projects({ projects }: { projects: Project[] }) {
  return (
    <section className="py-24">
      <h2 className="text-4xl font-bold text-center mb-16 text-white">Proyek Pilihan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-md group"
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
            whileHover={cardHoverVariants.hover}
          >
            <div className="overflow-hidden">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={600}
                height={360}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <p className="mt-2 text-gray-400 text-sm h-20 overflow-hidden">{project.description}</p>
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-[color:theme(accent)] hover:text-orange-300 font-semibold group"
              >
                Lihat Proyek <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function PortfolioClientView({ profile, skills, projects }: PortfolioViewProps) {
  return (
    <div className={`min-h-screen text-white selection:bg-[color:theme(accent)]/50 ${theme.gradient}`}>
      <Scene3D />
      <header className="container mx-auto px-6 py-4 flex justify-between items-center fixed top-0 w-full bg-[color:theme(primary)]/90 backdrop-blur-md z-50">
        <h1 className="text-2xl font-bold text-white">Dora.</h1>
        <nav className="space-x-6">
          <a href="#home" className="text-gray-300 hover:text-white">Home</a>
          <a href="#services" className="text-gray-300 hover:text-white">Services</a>
          <a href="#works" className="text-gray-300 hover:text-white">Works</a>
          <a href="#blog" className="text-gray-300 hover:text-white">Blog</a>
          <a href="#contact" className="text-gray-300 hover:text-white">Contact</a>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-[color:theme(accent)] text-white px-4 py-2 rounded-full"
          >
            Hire Me
          </motion.button>
        </nav>
      </header>
      <main className="container mx-auto px-6 pt-24 relative z-10">
        <Hero profile={profile} />
        <Skills skills={skills} />
        <Projects projects={projects} />
      </main>
    </div>
  );
}