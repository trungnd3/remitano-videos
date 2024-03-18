import { FormEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { useToast } from '@/src/components/ui/use-toast';
import { cn } from '@/src/lib/utils';

interface AuthFormProps {
  title: string;
  description: string;
  onSubmit: (username: string, password: string) => void;
  btnText: string;
  formSide: 'left' | 'right';
  otherSide: {
    title: string;
    description: string;
    href: string;
    btnText: string;
  };
}

export default function AuthForm({
  title,
  description,
  onSubmit,
  btnText,
  otherSide,
  formSide = 'left',
}: AuthFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!username.trim()) {
      toast({
        title: 'Username must not be empty.',
      });

      return;
    }

    if (!password.trim()) {
      toast({
        title: 'Password must not be empty.',
      });

      return;
    }

    onSubmit(username, password);
  };

  return (
    <div
      className={cn(
        'w-full min-h-[400px] flex transition-all',
        formSide === 'right' ? 'flex-row-reverse' : ''
      )}
    >
      <Card
        className={cn(
          'flex flex-col justify-center flex-1 rounded-r-none transition-all',
          formSide === 'left' ? 'pr-[20rem]' : 'pl-[20rem]'
        )}
      >
        <CardHeader className='pt-6 px-4'>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className='px-4 flex flex-col justify-end'>
          <form
            role='form'
            onSubmit={submitHandler}
            className='flex flex-col justify-between gap-6 pt-6'
          >
            <div className='flex flex-col justify-between gap-2 md:gap-4'>
              <Input
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='flex justify-center'>
              <Button
                type='submit'
                variant='destructive'
                size='xl'
                className='cursor-pointer'
              >
                {btnText}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card
        className={cn(
          'flex flex-col justify-center flex-1 bg-red-300 transition-all',
          formSide === 'left'
            ? 'rounded-l-[20rem] ml-[-20rem]'
            : 'rounded-r-[20rem] mr-[-20rem] z-10'
        )}
      >
        <CardHeader className='pt-6 px-4 flex flex-col justify-center items-center'>
          <CardTitle>{otherSide.title}</CardTitle>
          <CardDescription>{otherSide.description}</CardDescription>
        </CardHeader>
        <CardContent className='min-h-[200px] px-4 flex flex-col justify-end items-center'>
          <Link
            to={otherSide.href}
            className='px-4 py-3 rounded-sm bg-blue-500 text-white hover:bg-blue-700 cursor-pointer'
          >
            {otherSide.btnText}
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
