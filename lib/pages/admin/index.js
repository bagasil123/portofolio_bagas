import ProtectedAdminRoute from '../../components/ProtectedAdminRoute';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <ProtectedAdminRoute>
      <div className="p-8 bg-gray-900 text-white min-h-screen">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl">Admin Dashboard</h1>
            <button onClick={handleLogout} className="p-2 bg-red-600 rounded">Logout</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <Link href="/admin/skills" className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700">Manage Skills</Link>
           <Link href="/admin/projects" className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700">Manage Projects</Link>
           <Link href="/admin/profile" className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700">Manage Profile</Link>
        </div>
      </div>
    </ProtectedAdminRoute>
  );
}