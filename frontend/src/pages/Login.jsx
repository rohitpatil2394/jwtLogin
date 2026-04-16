import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://jwtlogin-5gx2.onrender.com/', data);
      localStorage.setItem('token', res.data.token);
      alert('Login successful');
      navigate('/profile');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setData({ ...data, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setData({ ...data, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;

