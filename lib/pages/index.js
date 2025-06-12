import { db } from '../lib/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import Scene3D from '../components/Scene3D';

// Komponen-komponen UI bisa di-split ke file sendiri nanti
function Hero({ profile }) {
    return (
        <div className="text-center py-20">
            <h1 className="text-5xl font-bold">{profile.name}</h1>
            <p className="text-xl mt-2">{profile.title}</p>
            <p className="mt-4 max-w-2xl mx-auto">{profile.bio}</p>
            <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg">
                Download CV
            </a>
        </div>
    )
}

function Skills({ skills }) {
    return (
        <motion.div
    key={project.id}
    className="bg-gray-800 rounded-lg overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    >
        {<div className="py-20">
            <h2 className="text-3xl font-bold text-center mb-8">My Skills</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 max-w-4xl mx-auto">
                {skills.map(skill => (
                    <div key={skill.id} className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
                        <img src={skill.logoUrl} alt={skill.name} className="h-16 w-16"/>
                        <p className="mt-2">{skill.name}</p>
                    </div>
                ))}
            </div>
        </div>}
    </motion.div>
    )
}

function Projects({ projects }) {
    return (
    <motion.div
    key={project.id}
    className="bg-gray-800 rounded-lg overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    >
        {<div className="py-20">
             <h2 className="text-3xl font-bold text-center mb-8">My Projects</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {projects.map(project => (
                    <div key={project.id} className="bg-gray-800 rounded-lg overflow-hidden">
                        <img src={project.imageUrl} alt={project.title} className="w-full h-60 object-cover"/>
                        <div className="p-6">
                            <h3 className="text-xl font-bold">{project.title}</h3>
                            <p className="mt-2 text-gray-400">{project.description}</p>
                            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-blue-400 hover:text-blue-300">
                                View Project &rarr;
                            </a>
                        </div>
                    </div>
                ))}
             </div>
        </div>}
    </motion.div>
    )
}


export default function HomePage({ profile, skills, projects }) {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Nanti di sini kita letakkan komponen 3D */}
      <main className="container mx-auto px-4">
        <Hero profile={profile} />
        <Skills skills={skills} />
        <Projects projects={projects} />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  // Fetch Profile
  const profileDoc = await getDoc(doc(db, 'profile', 'main')); // Asumsi ID dokumennya 'main'
  const profileData = profileDoc.data();

  // Fetch Skills
  const skillsSnapshot = await getDocs(collection(db, 'skills'));
  const skillsList = skillsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Fetch Projects
  const projectsSnapshot = await getDocs(collection(db, 'projects'));
  const projectsList = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return {
    props: {
      profile: profileData || {},
      skills: skillsList,
      projects: projectsList,
    },
    revalidate: 60, // Re-generate halaman setiap 60 detik jika ada data baru
  };
}

export default function HomePage({ profile, skills, projects }) {
  return (
    <div className="bg-gray-900 text-white min-h-screen relative">
      <Scene3D /> {/* Tambahkan ini */}
      <main className="container mx-auto px-4 relative z-10"> {/* Tambahkan z-index */}
        <Hero profile={profile} />
        <Skills skills={skills} />
        <Projects projects={projects} />
      </main>
    </div>
  );
}