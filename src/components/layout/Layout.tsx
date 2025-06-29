import React from 'react';
import { Header } from '../common/Header';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto p-6">
                {children}
            </main>
        </div>
    );
};