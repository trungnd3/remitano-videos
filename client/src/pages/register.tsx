import { AuthForm } from '@/src/components/forms';
import { createUser, useAppDispatch } from '@/src/store';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitHandler = async (username: string, password: string) => {
    await dispatch(createUser(username, password));
    navigate('/');
  };

  return (
    <div className='max-w-[50%] m-auto'>
      <AuthForm
        title='Signing Up'
        description='Dont have an account yet? Go ahead and create one.'
        btnText='Register'
        link={{ href: '/', text: 'Go back to SignIn' }}
        onSubmit={submitHandler}
      />
    </div>
  );
}
