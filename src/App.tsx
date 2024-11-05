import { Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import NewPost from './pages/NewPost';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/newPost' element={<NewPost />} />
      </Routes>
    </>
  );
}

export default App;
