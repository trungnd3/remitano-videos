import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from '@/components/layout';
import { Error } from '@/components/common';
import Home from '@/pages/home';
import Share from '@/pages/share';
import Play from '@/pages/play';
import Login from '@/pages/login';
import Register from '@/pages/register';
import { RootState } from '@/store/reducer';

function App() {
  const user = useSelector<RootState>((state) => state.auth.user);

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
