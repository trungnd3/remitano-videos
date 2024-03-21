import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ShareForm } from '@/src/components/forms';
import { shareVideo, useAppDispatch, useAppSelector } from '@/src/store';
import { WebSocketContext } from '@/src/context';

export default function Share() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.user.token);
  const { ready, send } = useContext(WebSocketContext);

  const submitHandler = async (url: string) => {
    dispatch(
      shareVideo(url, (id: number) => {
        if (ready && send) {
          send(
            JSON.stringify({
              auth: {
                token,
              },
              query: {
                type: 'SHARE',
                videoId: id,
              },
            })
          );
        }
        navigate('/');
      })
    );
  };

  return (
    <div className='max-w-[75%] m-auto'>
      <ShareForm
        title='Share your video'
        description='Input the YouTube URL here to share with your friends.'
        btnText='Share'
        onSubmit={submitHandler}
      />
    </div>
  );
}
