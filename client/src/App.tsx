import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/layout';
import { Error } from './components/common';
import { Home, Share, Play, Login, Register } from './screens';
import { fetchVideos, useAppDispatch, useAppSelector } from './store';
import { useAuth } from './hooks/use-auth';

function App() {
  let user = useAppSelector((state) => state.auth.user);
  const { authCheck } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    authCheck();
    if (!!user.token) {
      dispatch(fetchVideos());
    }
  }, [user.token, authCheck]);

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
