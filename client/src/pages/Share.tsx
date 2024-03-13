import { FormEventHandler, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heading } from '@/components/common';
import { useToast } from '@/components/ui/use-toast';

export default function Share() {
  const [url, setUrl] = useState('');
  const { toast } = useToast();

  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!url.trim()) {
      toast({
        title: 'YouTube URL must not be empty.',
      });

      return;
    }

    if (!url.match(/(?:https:\/\/www\.)?youtube\.com\/watch\?v=\S+/gm)) {
      toast({
        title: 'YouTube URL not valid.',
      });

      return;
    }

    console.log(url);
  };

  return (
    <>
      <Heading
        title='Share your video'
        description='Input the YouTube URL here to share with your friends.'
      />
      <div className='pt-8'>
        <form
          onSubmit={submitHandler}
          className='flex flex-col md:flex-row justify-center gap-4'
        >
          <Input
            type='text'
            id='ytUrl'
            placeholder='YouTube URL'
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
          <Button type='submit'>Share</Button>
        </form>
      </div>
    </>
  );
}
