// src/app/(admin_pages)/admin/projects/page.tsx
"use client";

import { useState, useEffect, useCallback, FormEvent, ChangeEvent } from 'react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';

// 1. Definisikan Interface untuk data Project
interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
}

export default function ManageProjectsPage() {
  // 2. Beri tipe yang benar pada semua state
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const projectsCollectionRef = collection(db, 'projects');

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const data = await getDocs(projectsCollectionRef);
    const projectsData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Project[];
    setProjects(projectsData);
    setLoading(false);
  }, []); // Dependensi kosong karena projectsCollectionRef stabil

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageFile || !title || !description || !projectUrl) {
      alert("Semua field harus diisi!");
      return;
    }
    setLoading(true);

    try {
      const imageRef = ref(storage, `projects/${Date.now()}-${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(projectsCollectionRef, { title, description, projectUrl, imageUrl });
      
      alert("Proyek berhasil ditambahkan!");
      // Reset form dan refresh data
      setTitle('');
      setDescription('');
      setProjectUrl('');
      setImageFile(null);
      // document.getElementById('project-image-input')?.value = ""; // Reset input file
      await fetchProjects();
    } catch (error) {
      console.error("Error adding project: ", error);
      alert("Gagal menambahkan proyek.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus proyek ini?")) {
      const projectDoc = doc(db, 'projects', id);
      await deleteDoc(projectDoc);
      await fetchProjects();
    }
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Manage Projects</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-800 rounded-lg shadow-md flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Add New Project</h2>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Project Title" required className="p-3 bg-gray-700 rounded"/>
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Project Description" required className="p-3 bg-gray-700 rounded h-28"/>
        <input type="url" value={projectUrl} onChange={e => setProjectUrl(e.target.value)} placeholder="https://github.com/user/repo" required className="p-3 bg-gray-700 rounded"/>
        <input id="project-image-input" type="file" onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)} accept="image/*" required className="p-2 bg-gray-700 rounded"/>
        <button type="submit" className="p-3 bg-blue-600 rounded hover:bg-blue-700" disabled={loading}>
          {loading ? 'Adding...' : 'Add Project'}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Existing Projects</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
            <div key={project.id} className="p-4 bg-gray-800 rounded-lg">
                <Image src={project.imageUrl} alt={project.title} width={400} height={200} className="w-full h-48 object-cover rounded-md mb-4" />
                <h3 className="font-bold text-lg">{project.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{project.description}</p>
                <div className="mt-4 flex justify-between items-center">
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">View Project</a>
                    <button onClick={() => handleDelete(project.id)} className="text-xs text-red-400 hover:underline">Delete</button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}