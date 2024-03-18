import { Link } from 'react-router-dom';

interface TextCenterProps {
  title: string;
  description?: string;
  direct?: {
    to: string;
    text: string;
  };
}

export default function TextCenter({
  title,
  description,
  direct,
}: TextCenterProps) {
  return (
    <div className='flex flex-col gap-4 justify-center items-center'>
      <h1 className='font-extrabold text-5xl text-white'>{title}</h1>
      {description && (
        <p className='font-bold text-3xl text-white'>{description}</p>
      )}
      {direct && (
        <Link
          to={direct.to}
          className='font-light text-xl text-white underline hover:text-blue-500'
        >
          {direct.text}
        </Link>
      )}
    </div>
  );
}
