import { AuthForm } from '@/src/components/forms';
import { useAuth } from '../hooks/use-auth';

export default function Login() {
  const { loginHandler } = useAuth();

  const submitHandler = (username: string, password: string) => {
    loginHandler(username, password);
  };

  return (
    <div className='max-w-[60%] m-auto'>
      <AuthForm
        title='Signing In'
        description='Login to watch and share videos'
        btnText='Log In'
        onSubmit={submitHandler}
        otherSide={{
          title: 'Have no account?',
          description: 'Please register here',
          href: '/register',
          btnText: 'Register',
        }}
        formSide='left'
      />
    </div>
  );
}
