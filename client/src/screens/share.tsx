import { useNavigate } from 'react-router-dom';
import { ShareForm } from '@/src/components/forms';
import { shareVideo, useAppDispatch } from '@/src/store';

export default function Share() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitHandler = async (url: string) => {
    dispatch(
      shareVideo(url, () => {
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
