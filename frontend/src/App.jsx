import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<h2>Welcome to JWT Auth</h2>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;

