import React from 'react';
import Footer from './footer';
import Header from './header';
import { Toaster } from '@/src/components/ui/toaster';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className='relative flex min-h-screen flex-col bg-gradient-to-b from-red-500 via-slate-500 to-black'>
        <Header />
        <main className='flex-1 flex items-center'>
          <div className='container mt-4'>{children}</div>
        </main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
}
