import { Link } from 'react-router-dom';

import { Logo } from '@/src/components/common';
import Navbar from './navbar';
import Sidebar from './sidebar';
import { useAppSelector } from '@/src/store/reducer';

export default function Header() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <header className='sticky top-0 w-full z-10 bg-slate-200'>
      <div className='container flex h-14 max-w-screen-2xl items-center justify-between'>
        <div className='mr-4 flex'>
          <Link to='/' className='flex items-center justify-start'>
            <Logo />
          </Link>
        </div>
        {!!user && !!user.token && (
          <div className='flex flex-1 items-center justify-end space-x-2 gap-2'>
            <Navbar />
            <Sidebar />
          </div>
        )}
      </div>
    </header>
  );
}
