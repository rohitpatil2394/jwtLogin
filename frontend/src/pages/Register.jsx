import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://jwtlogin-5gx2.onrender.com/api/auth/register', user);
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setUser({ ...user, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setUser({ ...user, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setUser({ ...user, password: e.target.value })} />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;











