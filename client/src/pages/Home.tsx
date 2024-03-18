import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import LinesEllipsis from 'react-lines-ellipsis';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from '@/src/components/ui/card';
import Prefer from '@/src/components/common/prefer';
import { preferVideo, useAppDispatch, useAppSelector } from '@/src/store';

export default function Home() {
  const navigate = useNavigate();
  const videos = useAppSelector((state) => state.video.items);
  const loggedInUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const cardClickHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    navigate(`/play/${event.currentTarget?.id}`);
  };

  const likeHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    const card = event.currentTarget.closest('.video-card');
    const videoId = parseInt(card?.id || '');

    if (videoId > 0) {
      dispatch(preferVideo(videoId, true));
    }
  };

  const dislikeHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    const card = event.currentTarget.closest('.video-card');
    const videoId = parseInt(card?.id || '');

    if (videoId > 0) {
      dispatch(preferVideo(videoId, false));
    }
  };

  return (
    <>
      {(!videos || !videos.length) && (
        <div className='flex justify-center items-center'>
          <h1 className='font-extrabold text-5xl text-white'>
            No video found.
          </h1>
        </div>
      )}
      {!!videos && !!videos.length && (
        <div className='my-8 grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {videos.map((video) => (
            <Card
              key={video.id}
              id={video.id.toString()}
              className='video-card flex flex-col hover:shadow-slate-700 hover:shadow-2xl'
            >
              <div className='flex-1'>
                <CardImage
                  className='w-full cursor-pointer'
                  src={video.thumbnailUrl}
                  alt={video.title}
                  onClick={cardClickHandler}
                />
                <CardHeader
                  className='px-2 min-h-20 cursor-pointer'
                  onClick={cardClickHandler}
                >
                  <CardTitle className='text-xl'>
                    <LinesEllipsis
                      text={video.title}
                      maxLine='2'
                      ellipsis='...'
                      trimRight
                      basedOn='letters'
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className='px-2'>
                  <CardDescription>
                    {video.description || video.title}
                  </CardDescription>
                </CardContent>
              </div>
              <CardFooter className='flex justify-between px-2'>
                <div>
                  <p>Shared by</p>
                  <p className='font-bold'>{video.sharedBy}</p>
                </div>
                <div className='flex gap-4'>
                  <Prefer
                    handler={likeHandler}
                    Icon={ThumbsUp}
                    count={video.likes.length}
                    active={video.likes.includes(loggedInUser.id)}
                  />
                  <Prefer
                    handler={dislikeHandler}
                    Icon={ThumbsDown}
                    count={video.dislikes.length}
                    active={video.dislikes.includes(loggedInUser.id)}
                  />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
