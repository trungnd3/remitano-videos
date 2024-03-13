import { FormEventHandler } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface AuthFormProps {
  title: string;
  description: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  btnText: string;
  link: {
    href: string;
    text: string;
  };
}

export default function AuthForm({
  title,
  description,
  onSubmit,
  btnText,
  link,
}: AuthFormProps) {
  return (
    <Card className='min-h-[300px] flex flex-col'>
      <CardHeader className=' pt-6 px-4'>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 px-4 flex flex-col justify-end'>
        <form
          onSubmit={onSubmit}
          className='flex flex-col justify-between gap-6'
        >
          <div className='flex flex-col md:flex-row justify-between gap-2 md:gap-4'>
            <Input placeholder='Username' />
            <Input placeholder='Password' />
          </div>
          <div className='flex justify-center md:justify-start'>
            <Button type='submit' variant='destructive'>
              {btnText}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex-1 flex justify-center md:justify-start md:px-4'>
        <Link to={link.href}>{link.text}</Link>
      </CardFooter>
    </Card>
  );
}
