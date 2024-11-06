import { Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import CreateNewPostPage from './pages/CreateNewPostPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/newPost' element={<CreateNewPostPage />} />
      </Routes>
    </>
  );
}

export default App;
