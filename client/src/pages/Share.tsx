import { ShareForm } from '@/src/components/forms';
import { useAppSelector } from '../store';

export default function Share() {
  const token = useAppSelector((state) => state.auth.user.token);

  const submitHandler = async (url: string) => {
    const response = await fetch('/api/videos', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        url,
      }),
    });

    const json = await response.json();
    console.log(json);
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
