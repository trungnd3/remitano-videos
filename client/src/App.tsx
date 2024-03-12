import { Route, Routes } from 'react-router-dom';

import Layout from '@/components/layout';
import Home from '@/pages/home';
import Share from '@/pages/share';
import Play from '@/pages/play';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/play/:id' element={<Play />} />
        <Route path='/share' element={<Share />} />
      </Routes>
    </Layout>
  );
}

export default App;
