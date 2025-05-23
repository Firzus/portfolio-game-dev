"use client";

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import AdminSidebar from '@/components/admin/AdminSidebar';

interface AdminLayoutClientProps {
    children: ReactNode;
}

export default function AdminLayoutClient({ children }: AdminLayoutClientProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const session = await authClient.getSession();

                if (session.data?.user) {
                    setIsAuthenticated(true);
                } else {
                    router.push('/login');
                    return;
                }
            } catch (error) {
                console.error('Authentication check failed:', error);
                router.push('/login');
                return;
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Vérification de l'authentification...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect to login
    }

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
} 