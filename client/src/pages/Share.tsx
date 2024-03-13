import { ShareForm } from '@/components/forms';

export default function Share() {
  return (
    <div className='max-w-[75%] m-auto'>
      <ShareForm
        title='Share your video'
        description='Input the YouTube URL here to share with your friends.'
        btnText='Share'
      />
    </div>
  );
}
