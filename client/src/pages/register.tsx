import { FormEventHandler } from 'react';

import { AuthForm } from '@/components/forms';

export default function Register() {
  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  return (
    <div className='max-w-[75%] m-auto'>
      <AuthForm
        title='Signing Up'
        description='Dont have an account yet? Go ahead and create one.'
        btnText='Submit'
        link={{ href: '/', text: 'Go back to LogIn' }}
        onSubmit={submitHandler}
      />
    </div>
  );
}
