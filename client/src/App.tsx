import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Home from './pages/Home';
import Share from './pages/Share';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/share' element={<Share />} />
      </Routes>
    </Layout>
  );
}

export default App;
