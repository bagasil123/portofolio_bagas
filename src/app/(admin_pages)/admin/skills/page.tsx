// src/app/(admin_pages)/admin/skills/page.tsx

"use client";

import { useState, useEffect, useCallback, FormEvent, ChangeEvent } from 'react';
// Hanya impor 'db' dari firebase, karena storage tidak dipakai lagi
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Image from 'next/image';
import type { Skill } from '@/lib/types';

export default function ManageSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillName, setSkillName] = useState<string>('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const skillsCollectionRef = collection(db, 'skills');

  const fetchSkills = useCallback(async () => {
    const data = await getDocs(skillsCollectionRef);
    const skillsData = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Skill[];
    setSkills(skillsData);
  }, [skillsCollectionRef]); // Anda bisa menambahkan skillsCollectionRef di sini jika linter meminta

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  // --- BAGIAN INI DIUBAH TOTAL UNTUK MENGGUNAKAN CLOUDINARY ---
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!logoFile || !skillName) {
      alert("Nama skill dan file logo harus diisi!");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append('file', logoFile);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      const logoUrl = data.secure_url; // URL gambar dari Cloudinary

      // Simpan URL dari Cloudinary ke Firestore
      await addDoc(skillsCollectionRef, { name: skillName, logoUrl: logoUrl });
      
      alert("Skill berhasil ditambahkan!");
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if(fileInput) fileInput.value = "";
      setSkillName('');
      setLogoFile(null);
      await fetchSkills();
    } catch (error) {
      console.error("Error adding skill: ", error);
      alert("Gagal menambahkan skill. Cek console untuk detail.");
    } finally {
      setLoading(false);
    }
  };
  // --- AKHIR BAGIAN YANG DIUBAH ---

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
            accept="image/png, image/jpeg, image/svg+xml, image/webp"
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