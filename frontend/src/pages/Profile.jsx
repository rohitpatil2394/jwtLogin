import { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://jwtlogin-5gx2.onrender.com/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setUser(res.data.user))
    .catch(() => alert('Unauthorized or Token expired'));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}

export default Profile;
