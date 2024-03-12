import React from 'react';
import Footer from './footer';
import Header from './header';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='relative flex min-h-screen flex-col bg-background'>
      <Header />
      <main className='flex-1'>
        <div className='container'>{children}</div>
      </main>
      <Footer />
    </div>
  );
}
