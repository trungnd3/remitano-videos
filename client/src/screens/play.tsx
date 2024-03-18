import { useParams } from 'react-router-dom';
import { Error, VideoCard } from '@/src/components/common';
import { useAppSelector } from '@/src/store';
import { AspectRatio } from '@/src/components/ui/aspect-ratio';

// TODO: integrate with video.js

export default function Play() {
  const params = useParams();

  if (!params.id) {
    return <Error status='404' message='Page not found' />;
  }

  const video = useAppSelector((state) =>
    state.video.items.find((item) => item.id === parseInt(params.id || ''))
  );

  if (!video) {
    return <Error status='404' message='Video not found' />;
  }

  return (
    <>
      <VideoCard video={video}>
        <AspectRatio ratio={16 / 9} className='w-full'>
          <iframe
            className='video w-full h-full'
            title='Youtube player'
            sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
            src={`https://youtube.com/embed/${video.youtubeId}?autoplay=1&fullscreen=1`}
          ></iframe>
        </AspectRatio>
      </VideoCard>
    </>
  );
}
