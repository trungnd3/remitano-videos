import { ThumbsDown, ThumbsUp } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Prefer } from '@/src/components/common';
import {
  IVideo,
  preferVideo,
  useAppDispatch,
  useAppSelector,
} from '@/src/store';
import TextTruncate from 'react-text-truncate';
import { MouseEventHandler } from 'react';

interface VideoCardProps {
  video: IVideo;
  children: React.ReactNode;
  onHeaderClick?: MouseEventHandler<HTMLDivElement>;
}

export default function VideoCard({
  video,
  children,
  onHeaderClick,
}: VideoCardProps) {
  const loggedInUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  return (
    <Card
      key={video.id}
      id={video.id.toString()}
      className='video-card flex flex-col hover:shadow-slate-700 hover:shadow-2xl'
    >
      <div className='flex-1'>
        {children}
        <CardHeader
          className='px-2 min-h-20 cursor-pointer'
          onClick={onHeaderClick}
        >
          <CardTitle className='text-xl'>
            <TextTruncate
              line={2}
              element='span'
              truncateText='…'
              text={video.title}
            />
          </CardTitle>
        </CardHeader>
        <CardContent className='px-2'>
          <CardDescription>{video.description || video.title}</CardDescription>
        </CardContent>
      </div>
      <CardFooter className='flex justify-between px-2'>
        <div>
          <p>Shared by</p>
          <p className='font-bold'>{video.sharedBy}</p>
        </div>
        <div className='flex gap-4'>
          <Prefer
            handler={() => dispatch(preferVideo(video.id, true))}
            Icon={ThumbsUp}
            count={video.likes.length}
            active={video.likes.includes(loggedInUser.id)}
          />
          <Prefer
            handler={() => dispatch(preferVideo(video.id, false))}
            Icon={ThumbsDown}
            count={video.dislikes.length}
            active={video.dislikes.includes(loggedInUser.id)}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
