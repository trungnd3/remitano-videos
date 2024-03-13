import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from '@/src/components/ui/card';
import { useAppSelector } from '@/src/store';

export default function Home() {
  const navigate = useNavigate();
  const videos = useAppSelector((state) => state.video.items);

  const cardClickHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    navigate(`/play/${event.currentTarget?.id}`);
  };

  return (
    <div className='my-8 grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {videos.map((video) => (
        <Card
          key={video.id}
          id={video.id}
          onClick={cardClickHandler}
          className='cursor-pointer'
        >
          <CardImage
            className='w-full'
            src={video.thumbnail}
            alt={video.title}
          />
          <CardHeader className='px-2'>
            <CardTitle>{video.title}</CardTitle>
          </CardHeader>
          <CardContent className='px-2'>
            <CardDescription>{video.description}</CardDescription>
          </CardContent>
          <CardFooter className='px-2'>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
