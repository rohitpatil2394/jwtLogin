import { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/auth/profile', {
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
