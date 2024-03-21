import { useContext, MouseEventHandler } from 'react';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import TextTruncate from 'react-text-truncate';

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
import { WebSocketContext } from '@/src/context';

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
  const token = useAppSelector((state) => state.auth.user.token);
  const { ready, send } = useContext(WebSocketContext);

  const likeHandler = (liked: boolean) => {
    dispatch(
      preferVideo(video.id, liked, (videoId: number, liked: boolean) => {
        if (ready && send) {
          send(
            JSON.stringify({
              auth: {
                token,
              },
              query: {
                type: liked ? 'LIKE' : 'DISLIKE',
                videoId,
              },
            })
          );
        }
      })
    );
  };

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
            handler={() => likeHandler(true)}
            Icon={ThumbsUp}
            count={video.likes.length}
            active={video.likes.includes(loggedInUser.id)}
          />
          <Prefer
            handler={() => likeHandler(false)}
            Icon={ThumbsDown}
            count={video.dislikes.length}
            active={video.dislikes.includes(loggedInUser.id)}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
