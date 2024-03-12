import { Link } from 'react-router-dom';

interface ErrorProps {
  status: string;
  message: string;
}

export default function Error({ status, message }: ErrorProps) {
  return (
    <>
      <h1 className='text-3xl font-extrabold'>{status}</h1>
      <h2 className='text-xl'>{message}</h2>
      <Link to='/'>
        <p>Go back to Home</p>
      </Link>
    </>
  );
}
