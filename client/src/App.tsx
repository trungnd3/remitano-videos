import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/layout';
import { Error } from './components/common';
import Home from './pages/home';
import Share from './pages/share';
import Play from './pages/play';
import Login from './pages/login';
import Register from './pages/register';
import {
  IAuthState,
  authActions,
  fetchVideos,
  useAppDispatch,
  useAppSelector,
} from './store';

function App() {
  let user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user.token) {
      const userStr = localStorage.getItem('user');
      if (!!userStr) {
        const userObj: IAuthState['user'] = JSON.parse(userStr);
        dispatch(authActions.login({ user: { ...userObj } }));
      }
    }
    if (!!user.token) {
      dispatch(fetchVideos());
    }
  }, [user.token]);

  return (
    <Layout>
      <Routes>
        {!!user && !!user.token && (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/play' element={<Play />}>
              <Route path=':id' />
            </Route>
            <Route path='/share' element={<Share />} />
          </>
        )}
        {(!user || !user.token) && (
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
