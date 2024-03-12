import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from '@/components/ui/card';
import { Heading } from '@/components/common';
import { useNavigate } from 'react-router-dom';
import { MouseEventHandler } from 'react';

const videos = [
  {
    id: '1',
    thumbnail: 'https://i.ytimg.com/vi/tN6oJu2DqCM/hqdefault.jpg',
    title: 'Back End Developer Roadmap 2024',
    sharedBy: 'trungnguyen@gmail.com',
    likes: 12,
    dislike: 3,
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text.',
  },
  {
    id: '2',
    thumbnail: 'https://i.ytimg.com/vi/tN6oJu2DqCM/hqdefault.jpg',
    title: 'Back End Developer Roadmap 2024',
    sharedBy: 'trungnguyen@gmail.com',
    likes: 12,
    dislike: 3,
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text.',
  },
  {
    id: '3',
    thumbnail: 'https://i.ytimg.com/vi/tN6oJu2DqCM/hqdefault.jpg',
    title: 'Back End Developer Roadmap 2024',
    sharedBy: 'trungnguyen@gmail.com',
    likes: 12,
    dislike: 3,
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text.',
  },
  {
    id: '4',
    thumbnail: 'https://i.ytimg.com/vi/tN6oJu2DqCM/hqdefault.jpg',
    title: 'Back End Developer Roadmap 2024',
    sharedBy: 'trungnguyen@gmail.com',
    likes: 12,
    dislike: 3,
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text.',
  },
  {
    id: '5',
    thumbnail: 'https://i.ytimg.com/vi/tN6oJu2DqCM/hqdefault.jpg',
    title: 'Back End Developer Roadmap 2024',
    sharedBy: 'trungnguyen@gmail.com',
    likes: 12,
    dislike: 3,
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text.',
  },
];

export default function Home() {
  const navigate = useNavigate();

  const cardClickHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    navigate(`/play/${event.currentTarget?.id}`);
  };

  return (
    <>
      <Heading
        title='Playground'
        description='Videos shared between friends. Enjoy.'
      />
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
    </>
  );
}
