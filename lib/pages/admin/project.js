import { useState, useEffect } from 'react';
import ProtectedAdminRoute from '../../components/ProtectedAdminRoute';

export default function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName] = useState('');
  const [logoFile, setLogoFile] = useState(null);

  const skillsCollectionRef = collection(db, 'skills');

  const fetchSkills = async () => {
    const data = await getDocs(skillsCollectionRef);
    setSkills(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchSkills();
  }, []);


  const handleDelete = async (id) => {
    const skillDoc = doc(db, 'skills', id);
    await deleteDoc(skillDoc);
    fetchSkills(); // Refresh list
  };

      // --- INI BAGIAN YANG DIUBAH ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!logoFile || !skillName) return;

        // 1. Siapkan data untuk dikirim ke Cloudinary
        const formData = new FormData();
        formData.append('file', logoFile);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

        try {
            // 2. Kirim file ke API Cloudinary
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            const data = await response.json();
            const logoUrl = data.secure_url; // Dapatkan URL gambar dari Cloudinary

            // 3. Simpan URL ke Firestore (bagian ini sama seperti sebelumnya)
            await addDoc(skillsCollectionRef, { name: skillName, logoUrl: logoUrl });

            setSkillName('');
            setLogoFile(null);
            fetchSkills(); // Refresh list
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };


  return (
    <ProtectedAdminRoute>
      <div className="p-8">
        <h1 className="text-2xl mb-4">Manage Skills</h1>
        {/* Form to add new skill */}
        <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-200 rounded">
          <input
            type="text"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            placeholder="Skill Name"
            className="p-2 mr-2 rounded"
          />
          <input
            type="file"
            onChange={(e) => setLogoFile(e.target.files[0])}
            className="p-1 mr-2"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">Add Skill</button>
        </form>

        {/* List of existing skills */}
        <div className="grid grid-cols-4 gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="p-4 bg-white rounded shadow text-center">
              <img src={skill.logoUrl} alt={skill.name} className="h-16 w-16 mx-auto mb-2"/>
              <p>{skill.name}</p>
              <button onClick={() => handleDelete(skill.id)} className="mt-2 text-red-500 text-sm">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </ProtectedAdminRoute>
  );
}