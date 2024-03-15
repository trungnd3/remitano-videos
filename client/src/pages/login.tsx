import { AuthForm } from '@/src/components/forms';
import { useAppDispatch, signInUser } from '@/src/store';

export default function Login() {
  const dispatch = useAppDispatch();

  const submitHandler = (username: string, password: string) => {
    dispatch(signInUser(username, password));
  };

  return (
    <div className='max-w-[50%] m-auto'>
      <AuthForm
        title='Signing In'
        description='Login to watch and share videos'
        btnText='Log In'
        link={{ href: '/register', text: 'Register here' }}
        onSubmit={submitHandler}
      />
    </div>
  );
}
