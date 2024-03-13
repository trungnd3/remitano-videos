import { useParams } from 'react-router-dom';

import { AspectRatio } from '@/src/components/ui/aspect-ratio';
import { Error, Heading } from '@/src/components/common';
import { useAppSelector } from '@/src/store';

// TODO: integrate with video.js

export default function Play() {
  const params = useParams();

  console.log(params);

  if (!params.id) {
    return <Error status='404' message='Page not found' />;
  }

  const video = useAppSelector((state) =>
    state.video.items.find((item) => item.id === params.id)
  );

  if (!video) {
    return <Error status='404' message='Video not found' />;
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
