import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import { CardImage } from '@/src/components/ui/card';
import { TextCenter, VideoCard } from '@/src/components/common';
import { useAppSelector } from '@/src/store';

export default function Home() {
  const navigate = useNavigate();
  const videos = useAppSelector((state) => state.video.items);

  const cardClickHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    const card = event.currentTarget.closest('.video-card');
    const videoId = card?.id;
    navigate(`/play/${videoId}`);
  };

  return (
    <>
      {(!videos || !videos.length) && <TextCenter title='No video found.' />}
      {!!videos && !!videos.length && (
        <div className='my-8 grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {videos.map((video) => (
            <VideoCard
              video={video}
              onHeaderClick={cardClickHandler}
              key={video.youtubeId}
            >
              <CardImage
                className='w-full cursor-pointer'
                src={video.thumbnailUrl}
                alt={video.title}
                onClick={cardClickHandler}
              />
            </VideoCard>
          ))}
        </div>
      )}
    </>
  );
}
