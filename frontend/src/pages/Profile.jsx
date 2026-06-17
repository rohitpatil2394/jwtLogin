import { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);

  const styles = {
    container: {
      padding: '40px',
      textAlign: 'center'
    },
    card: {
      display: 'inline-block',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('https://jwtlogin-5gx2.onrender.com/api/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUser(res.data.user))
    .catch(() => alert('Unauthorized'));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Profile</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
      </div>
    </div>
  );
}

export default Profile;