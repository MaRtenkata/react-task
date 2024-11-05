import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import NewPost from './pages/NewPost';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/newPost' element={<NewPost />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
