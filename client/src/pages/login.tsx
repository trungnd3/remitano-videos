import { FormEventHandler } from 'react';

import { AuthForm } from '@/components/forms';

export default function Login() {
  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  return (
    <div className='max-w-[75%] m-auto'>
      <AuthForm
        title='Signing In'
        description='Login to watch and share videos'
        btnText='LogIn'
        link={{ href: '/register', text: 'Register here' }}
        onSubmit={submitHandler}
      />
    </div>
  );
}
