import { AuthForm } from '@/src/components/forms';
import { useAppDispatch, signInUser } from '@/src/store';

export default function Login() {
  const dispatch = useAppDispatch();

  const submitHandler = (username: string, password: string) => {
    dispatch(signInUser(username, password));
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
