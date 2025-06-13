// src/app/(admin_pages)/admin/skills/page.tsx

"use client";

import { useState, useEffect, useCallback, FormEvent, ChangeEvent } from 'react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';

// 1. Definisikan "bentuk" atau Interface untuk data Skill
interface Skill {
  id: string;
  name: string;
  logoUrl: string;
}

export default function ManageSkillsPage() {
  // 2. Beri tipe pada setiap state
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillName, setSkillName] = useState<string>('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const skillsCollectionRef = collection(db, 'skills');

  // 3. Gunakan useCallback untuk fungsi agar tidak dibuat ulang terus-menerus
  const fetchSkills = useCallback(async () => {
    const data = await getDocs(skillsCollectionRef);
    const skillsData = data.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      logoUrl: doc.data().logoUrl,
    })) as Skill[];
    setSkills(skillsData);
  }, []); // Dependensi kosong karena skillsCollectionRef stabil

  // 4. Perbaiki dependensi useEffect
  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  // 5. Beri tipe pada parameter event 'e'
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!logoFile || !skillName) {
      alert("Nama skill dan file logo harus diisi!");
      return;
    }
    setLoading(true);

    try {
      const logoRef = ref(storage, `skills/${Date.now()}-${logoFile.name}`);
      await uploadBytes(logoRef, logoFile);
      const logoUrl = await getDownloadURL(logoRef);

      await addDoc(skillsCollectionRef, { name: skillName, logoUrl: logoUrl });
      
      // Reset form dan refresh data
      setSkillName('');
      setLogoFile(null);
      // document.getElementById('file-input')?.value = ""; // Cara untuk mereset input file
      await fetchSkills();
    } catch (error) {
      console.error("Error adding skill: ", error);
      alert("Gagal menambahkan skill. Cek console untuk detail.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus skill ini?")) {
      const skillDoc = doc(db, 'skills', id);
      await deleteDoc(skillDoc);
      await fetchSkills();
    }
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Manage Skills</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-800 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <input
            type="text"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            placeholder="Skill Name (e.g., React)"
            className="p-3 bg-gray-700 rounded border border-gray-600 w-full"
            required
          />
          <input
            id="file-input"
            type="file"
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/svg+xml"
            className="p-2 bg-gray-700 rounded border border-gray-600 w-full"
            required
          />
          <button type="submit" className="p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors w-full" disabled={loading}>
            {loading ? 'Adding...' : 'Add Skill'}
          </button>
        </div>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="p-4 bg-gray-800 rounded-lg shadow-md text-center relative">
            <Image src={skill.logoUrl} alt={skill.name} width={64} height={64} className="mx-auto mb-2 h-16 w-16 object-contain"/>
            <p className="font-semibold break-words">{skill.name}</p>
            <button onClick={() => handleDelete(skill.id)} className="mt-2 text-xs text-red-400 hover:text-red-300">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}