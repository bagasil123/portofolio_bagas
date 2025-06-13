"use client";

import React from 'react';
import type { Profile, Skill, Project } from '@/lib/types';
import { motion, Variants } from 'framer-motion';

import { Scene3D } from '@/components/3d/Scene3D';
import { ProjectCard3D } from '@/components/3d/ProjectCard3D';
import { SkillCard3D } from '@/components/3d/SkillCard3D';
import { AnimatedCursor } from '@/components/ui/AnimatedCursor';

interface PortfolioViewProps {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
}

const fadeInAnimationVariants: Variants = {
  initial: { opacity: 0, y: 100 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * index, duration: 0.8, ease: "easeOut" },
  }),
};

// --- Child Components for Sections ---

const Hero = ({ profile }: { profile: Profile }) => (
  <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center p-4 relative z-10">
    <motion.h1
      className="text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 py-2"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}
    >{profile.name || 'Nama Anda'}</motion.h1>
    <motion.p
      className="text-xl md:text-2xl mt-4 text-gray-300"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
    >{profile.title || 'Title Anda'}</motion.p>
    <motion.p
      className="mt-6 max-w-2xl mx-auto text-gray-400"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
    >{profile.bio || 'Bio singkat Anda di sini.'}</motion.p>
    {profile.cvUrl && (
      <motion.a
        href={profile.cvUrl} target="_blank" rel="noopener noreferrer"
        className="mt-8 inline-block bg-orange-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-orange-600/30"
        whileHover={{ scale: 1.05, y: -5, boxShadow: "0 0 30px rgba(249, 115, 22, 0.5)" }} whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
      >Download CV</motion.a>
    )}
  </section>
);

const Skills = ({ skills }: { skills: Skill[] }) => (
  <section id="skills" className="py-24 relative z-10">
    <motion.h2
      className="text-4xl font-bold text-center mb-16 text-white"
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8 }}
    >Teknologi & Tools</motion.h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto px-4">
      {skills.map((skill, index) => (
        // --- PERBAIKAN UTAMA: Tambahkan pengecekan data ---
        // Ini memastikan kita hanya merender kartu jika skill.logoUrl ada isinya.
        skill.logoUrl && (
          <motion.div
            key={skill.id}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
          >
            <SkillCard3D skill={skill} />
          </motion.div>
        )
      ))}
    </div>
  </section>
);

const Projects = ({ projects }: { projects: Project[] }) => (
  <section id="projects" className="py-24 relative z-10">
    <motion.h2
      className="text-4xl font-bold text-center mb-16 text-white"
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8 }}
    >Proyek Unggulan</motion.h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto px-4">
      {projects.map((project, index) => (
        // --- PERBAIKAN UTAMA: Tambahkan pengecekan data ---
        // Ini memastikan kita hanya merender kartu jika project.imageUrl ada isinya.
        project.imageUrl && (
          <motion.div
            key={project.id}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
          >
            <ProjectCard3D project={project} />
          </motion.div>
        )
      ))}
    </div>
  </section>
);

/**
 * The main client-side component that assembles the entire portfolio view.
 */
export default function PortfolioClientView({ profile, skills, projects }: PortfolioViewProps) {
  return (
    <div className="min-h-screen text-white selection:bg-orange-500/50 md:cursor-none bg-neutral-900">
      <AnimatedCursor />
      <Scene3D />
      <main className="relative">
        <Hero profile={profile} />
        <Skills skills={skills} />
        <Projects projects={projects} />
      </main>
    </div>
  );
}