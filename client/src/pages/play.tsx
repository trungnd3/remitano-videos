import { useParams } from 'react-router-dom';

import { Error, Heading } from '@/components/common';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const video = {
  id: '1',
  thumbnail: 'https://i.ytimg.com/vi/tN6oJu2DqCM/hqdefault.jpg',
  url: 'https://www.youtube.com/watch?v=tN6oJu2DqCM',
  title: 'Back End Developer Roadmap 2024',
  sharedBy: 'trungnguyen@gmail.com',
  likes: 12,
  dislike: 3,
  description:
    'Contrary to popular belief, Lorem Ipsum is not simply random text.',
};

// TODO: integrate with video.js

export default function Play() {
  const params = useParams();

  console.log(params);

  if (!params.id) {
    return <Error status='404' message='Not found' />;
  }

  return (
    <>
      <AspectRatio ratio={16 / 9} className='w-full'>
        <iframe
          className='video w-full h-full'
          title='Youtube player'
          sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
          src={`https://youtube.com/embed/tN6oJu2DqCM?autoplay=1&fullscreen=1`}
        ></iframe>
      </AspectRatio>
      <Heading title={video.title} description='Playing...' />
    </>
  );
}
