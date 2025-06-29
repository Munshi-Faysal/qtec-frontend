// src/components/Layout.tsx
import React from 'react';
import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-white">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

export default Layout;
