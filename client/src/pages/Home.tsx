import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Heading } from '@/components/common';

const videos = [
  {
    id: '1',
    title: 'Movie',
    sharedBy: 'trungnguyen@gmail.com',
    likes: 12,
    dislike: 3,
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
  },
  {
    id: '2',
    title: 'Movie',
    sharedBy: 'trungnguyen@gmail.com',
    likes: 12,
    dislike: 3,
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
  },
  {
    id: '3',
    title: 'Movie',
    sharedBy: 'trungnguyen@gmail.com',
    likes: 12,
    dislike: 3,
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
  },
  {
    id: '4',
    title: 'Movie',
    sharedBy: 'trungnguyen@gmail.com',
    likes: 12,
    dislike: 3,
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
  },
  {
    id: '5',
    title: 'Movie',
    sharedBy: 'trungnguyen@gmail.com',
    likes: 12,
    dislike: 3,
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
  },
];

export default function Home() {
  return (
    <>
      <Heading
        title='Playground'
        description='Videos shared between friends. Enjoy.'
      />
      <div className='my-8 grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {videos.map((video) => (
          <Card key={video.id}>
            <CardHeader>
              <CardTitle>{video.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
              <CardDescription>{video.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
