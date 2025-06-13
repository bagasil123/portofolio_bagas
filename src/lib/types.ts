// src/lib/types.ts

export interface Profile {
  name?: string;
  title?: string;
  bio?: string;
  cvUrl?: string;
}

export interface Skill {
  id: string;
  name: string;
  logoUrl: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
}