"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  Image,
  Settings,
  BarChart,
  LogOut,
  Gamepad2
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, color: 'blue' },
  { name: 'Projets', href: '/admin/projects', icon: Image, color: 'green' },
  { name: 'Blog', href: '/admin/blog', icon: Briefcase, color: 'purple' },
  { name: 'Compétences', href: '/admin/skills', icon: GraduationCap, color: 'orange' },
  { name: 'Messages', href: '/admin/messages', icon: BarChart, color: 'blue' },
  { name: 'Paramètres', href: '/admin/settings', icon: Settings, color: 'gray' },
];

const sidebarVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { x: -10, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3
    }
  }
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/login');
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      // Forcer la redirection même en cas d'erreur
      router.push('/login');
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <motion.div
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="w-64 vite-card border-r-0 rounded-r-none flex flex-col h-full"
      style={{
        background: 'var(--card-bg)',
        borderRight: '1px solid var(--border-primary)'
      }}
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="h-16 flex items-center justify-center border-b"
        style={{ borderColor: 'var(--border-primary)' }}
      >
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
            <Gamepad2 className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold gradient-text">Admin Panel</h1>
        </div>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 px-3">
        <motion.div variants={itemVariants} className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={item.href}
                  className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${isActive
                      ? 'vite-card shadow-lg border-l-4 border-blue-500'
                      : 'hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                  style={{
                    color: isActive ? 'var(--heading-color)' : 'var(--subheading-color)',
                    background: isActive ? 'var(--card-bg)' : 'transparent'
                  }}
                >
                  <div className={`p-2 rounded-lg mr-3 ${isActive
                      ? item.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                        item.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                          item.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' :
                            item.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30' :
                              'bg-gray-100 dark:bg-gray-900/30'
                      : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                    <item.icon
                      className={`h-4 w-4 ${isActive
                          ? item.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                            item.color === 'green' ? 'text-green-600 dark:text-green-400' :
                              item.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                                item.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                                  'text-gray-600 dark:text-gray-400'
                          : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                        }`}
                    />
                  </div>
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-2 h-2 bg-blue-500 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </nav>

      {/* User Section & Logout */}
      <motion.div
        variants={itemVariants}
        className="p-4 border-t"
        style={{ borderColor: 'var(--border-primary)' }}
      >
        <div className="mb-4 p-3 vite-card text-center">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-2 flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <p className="text-sm font-medium" style={{ color: 'var(--heading-color)' }}>
            Administrateur
          </p>
          <p className="text-xs text-muted">
            Connecté
          </p>
        </div>

        <motion.button
          onClick={handleLogout}
          disabled={isLoggingOut}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 vite-card hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <div className="p-2 rounded-lg mr-3 bg-red-100 dark:bg-red-900/30">
            <LogOut className="h-4 w-4 text-red-600 dark:text-red-400" />
          </div>
          <span style={{ color: 'var(--subheading-color)' }}>
            {isLoggingOut ? 'Déconnexion...' : 'Se déconnecter'}
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
} 