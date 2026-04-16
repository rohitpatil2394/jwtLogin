import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully');
    navigate('/login');
  };

  const styles = {
    nav: {
      backgroundColor: '#333',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between', // left + right spacing
      alignItems: 'center'
    },
    navLinks: {
      display: 'flex',
      gap: '50px' //
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '16px'
    },
    button: {
      padding: '6px 12px',
      border: 'none',
      backgroundColor: 'red',
      color: 'white',
      cursor: 'pointer',
      borderRadius: '4px'
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/register" style={styles.link}>Register</Link>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>
      </div>

      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;