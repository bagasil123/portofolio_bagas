// src/app/(admin_pages)/admin/profile/page.tsx
"use client";

import { useState, useEffect, useCallback, FormEvent } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Definisikan Interface untuk data Profile
interface Profile {
  name?: string;
  title?: string;
  bio?: string;
  cvUrl?: string;
}

export default function ManageProfilePage() {
  const [profile, setProfile] = useState<Profile>({});
  const [loading, setLoading] = useState(false);

  // Dokumen profil kita beri ID 'main' agar selalu sama
  const profileDocRef = doc(db, 'profile', 'main');

  const fetchProfile = useCallback(async () => {
    const docSnap = await getDoc(profileDocRef);
    if (docSnap.exists()) {
      setProfile(docSnap.data() as Profile);
    } else {
      console.log("No such document!");
    }
  }, [profileDocRef]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Gunakan setDoc dengan merge:true untuk update atau create jika belum ada
      await setDoc(profileDocRef, profile, { merge: true });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Gagal mengupdate profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Manage Profile</h1>
      
      <form onSubmit={handleSubmit} className="p-6 bg-gray-800 rounded-lg shadow-md flex flex-col gap-4">
        <input type="text" name="name" value={profile.name || ''} onChange={handleInputChange} placeholder="Your Name" className="p-3 bg-gray-700 rounded"/>
        <input type="text" name="title" value={profile.title || ''} onChange={handleInputChange} placeholder="Your Title (e.g., Frontend Developer)" className="p-3 bg-gray-700 rounded"/>
        <textarea name="bio" value={profile.bio || ''} onChange={handleInputChange} placeholder="A short bio about you" className="p-3 bg-gray-700 rounded h-32"/>
        <input type="url" name="cvUrl" value={profile.cvUrl || ''} onChange={handleInputChange} placeholder="Link to your CV (PDF)" className="p-3 bg-gray-700 rounded"/>
        
        <button type="submit" className="p-3 bg-green-600 rounded hover:bg-green-700" disabled={loading}>
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}