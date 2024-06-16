// app/layout.tsx
'use client';

import { ReactNode, useEffect } from 'react';
import { AuthProvider, useAuth } from './authContext';
import './globals.css';
import { useRouter, usePathname } from 'next/navigation';

interface RootLayoutProps {
    children: ReactNode;
}

function AuthGuard({ children }: { children: ReactNode }) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        console.log('AuthGuard: isAuthenticated =', isAuthenticated);
        if (!isAuthenticated && pathname !== '/login') {
            router.push('/login');
        }
    }, [isAuthenticated, pathname, router]);

    if (!isAuthenticated && pathname !== '/login') {
        return <div>Redirecting to login...</div>;
    }

    return <>{children}</>;
}

export default function RootLayout({ children }: RootLayoutProps) {
    console.log('RootLayout: Rendering with children:', children);
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <AuthGuard>{children}</AuthGuard>
                </AuthProvider>
            </body>
        </html>
    );
}
