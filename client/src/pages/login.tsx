import { AuthForm } from '@/components/forms';
import { useAppDispatch, authActions } from '@/store';

export default function Login() {
  const dispatch = useAppDispatch();

  const submitHandler = (username: string, password: string) => {
    console.log(username, password);
    localStorage.setItem('user', username);
    dispatch(
      authActions.login({
        user: username,
      })
    );
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
