import { Link, useNavigate } from 'react-router-dom';

import Navbar from './navbar';
import { Button } from '@/components/ui/button';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className='sticky top-0 w-full'>
      <div className='container flex h-14 max-w-screen-2xl items-center'>
        <div className='mr-4 hidden md:flex'>
          <Link to='/' className='flex items-center justify-start'>
            <img src='/logo-black.svg' alt='Logo' className='w-10 h-10' />
            <span className='hidden font-bold sm:inline-block'>
              Funny Videos
            </span>
          </Link>
          <Navbar />
        </div>
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <p>Welcome trungnguyen@gmail.com</p>
          <Button variant='default' onClick={() => navigate('/share')}>
            Share a movie
          </Button>
          <Button variant='secondary' className=''>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
