import { FormEventHandler, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface ShareFormProps {
  title: string;
  description: string;
  btnText: string;
}

export default function ShareForm({
  title,
  description,
  btnText,
}: ShareFormProps) {
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
    <Card className='min-h-[250px] flex flex-col'>
      <CardHeader className='pt-6 px-4'>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 px-4 flex flex-col justify-center'>
        <form
          onSubmit={submitHandler}
          className='flex flex-col md:flex-row justify-center gap-2 md:gap-4'
        >
          <Input
            type='text'
            id='ytUrl'
            placeholder='YouTube URL'
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            className='flex-1 md:flex-[4]'
          />
          <Button
            variant='destructive'
            type='submit'
            className='flex-1 md:flex-[2]'
          >
            {btnText}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
