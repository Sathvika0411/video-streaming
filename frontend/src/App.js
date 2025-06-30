import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Upload from './pages/Upload';
import Home from './pages/Home';
import MyVideos from './pages/MyVideos';
import Watch from './pages/Watch';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/my-videos' element={<MyVideos />} />
        <Route path='/watch/:id' element={<Watch />} />
      </Routes>
    </>
  );
}

export default App;
