// src/app/(admin_pages)/admin/page.tsx

import Link from 'next/link';
import { Shield, FileText, Briefcase } from 'lucide-react';

const cardItems = [
  {
    href: '/admin/skills',
    title: 'Manage Skills',
    description: 'Tambah, lihat, dan hapus skill set Anda.',
    icon: <Shield className="w-8 h-8 text-blue-400" />
  },
  {
    href: '/admin/projects',
    title: 'Manage Projects',
    description: 'Tambah, lihat, dan hapus proyek portofolio.',
    icon: <Briefcase className="w-8 h-8 text-green-400" />
  },
  {
    href: '/admin/profile',
    title: 'Manage Profile',
    description: 'Ubah nama, title, bio, dan link CV Anda.',
    icon: <FileText className="w-8 h-8 text-yellow-400" />
  }
];

export default function AdminDashboardPage() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <p className="text-neutral-400 mb-12">Pilih salah satu menu di bawah ini untuk mulai mengelola konten website Anda.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cardItems.map((item) => (
          <Link href={item.href} key={item.title} className="block p-6 bg-gray-800 rounded-xl border border-gray-700 hover:bg-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
              {item.icon}
              <h2 className="text-xl font-bold text-neutral-100">{item.title}</h2>
            </div>
            <p className="mt-4 text-neutral-300">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}