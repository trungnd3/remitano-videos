import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from '@/components/layout';
import { Error } from '@/components/common';
import Home from '@/pages/home';
import Share from '@/pages/share';
import Play from '@/pages/play';
import Login from '@/pages/login';
import Register from '@/pages/register';
import { authActions, useAppDispatch, useAppSelector } from '@/store';

function App() {
  let user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      user = localStorage.getItem('user') || '';
      dispatch(authActions.login({ user }));
    }
  }, []);

  return (
    <Layout>
      <Routes>
        {!!user && (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/play' element={<Play />}>
              <Route path=':id' />
            </Route>
            <Route path='/share' element={<Share />} />
          </>
        )}
        {!user && (
          <>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </>
        )}
        <Route
          path='*'
          element={<Error status='404' message='Page not found' />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
