import { useState } from 'react';
import axios from 'axios';
import {
  Link,
  useNavigate
} from 'react-router-dom';

import { toast } from 'react-toastify';

function Login() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: ''
  });

  // LOGIN
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        'https://jwtlogin-5gx2.onrender.com/api/auth/login',
        data
      );

      localStorage.setItem(
        'token',
        res.data.token
      );

      localStorage.setItem(
        'user',
        JSON.stringify(res.data.user)
      );

      toast.success('Login successful');

      navigate('/');

    } catch (err) {

      toast.error(
        err.response?.data?.message
      );
    }
  };

  return (

    <div style={styles.container}>

      {/* LEFT SECTION */}
      <div style={styles.leftSection}>

        <div style={styles.overlay}>

          <h1 style={styles.brand}>
            MyShop
          </h1>

          <h2 style={styles.heading}>
            Welcome Back
          </h2>

          <p style={styles.text}>
            Login to continue shopping,
            manage your orders,
            wishlist and payments securely.
          </p>

        </div>

      </div>

      {/* RIGHT SECTION */}
      <div style={styles.rightSection}>

        <form
          onSubmit={handleLogin}
          style={styles.form}
        >

          <h2 style={styles.formTitle}>
            Login
          </h2>

          <p style={styles.subtitle}>
            Access your account
          </p>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Enter your email"
            style={styles.input}
            required
            onChange={(e) =>
              setData({
                ...data,
                email: e.target.value
              })
            }
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Enter password"
            style={styles.input}
            required
            onChange={(e) =>
              setData({
                ...data,
                password: e.target.value
              })
            }
          />

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            style={styles.button}
          >
            Login
          </button>

          {/* REGISTER */}
          <p style={styles.registerText}>

            Don’t have an account?

            <Link
              to="/register"
              style={styles.registerLink}
            >
              Register
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}


// STYLES
const styles = {

  container: {
    display: 'flex',
    minHeight: '100vh',
    flexWrap: 'wrap',
    background: '#f4f7fb'
  },

  // LEFT
  leftSection: {
    flex: 1,
    minWidth: '320px',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1600&auto=format&fit=crop)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  overlay: {
    width: '100%',
    height: '100%',
    background:
      'linear-gradient(rgba(15,23,42,0.75), rgba(30,41,59,0.82))',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '50px',
    color: '#fff'
  },

  brand: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '20px'
  },

  heading: {
    fontSize: '40px',
    marginBottom: '18px',
    lineHeight: '1.3'
  },

  text: {
    fontSize: '17px',
    lineHeight: '1.8',
    color: '#e2e8f0',
    maxWidth: '500px'
  },

  // RIGHT
  rightSection: {
    flex: 1,
    minWidth: '320px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px'
  },

  form: {
    width: '100%',
    maxWidth: '430px',
    background: '#fff',
    padding: '40px',
    borderRadius: '24px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.12)'
  },

  formTitle: {
    textAlign: 'center',
    marginBottom: '8px',
    color: '#0f172a',
    fontSize: '34px'
  },

  subtitle: {
    textAlign: 'center',
    color: '#64748b',
    marginBottom: '30px'
  },

  input: {
    width: '100%',
    padding: '14px',
    marginBottom: '18px',
    borderRadius: '12px',
    border: '1px solid #cbd5e1',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box'
  },

  button: {
    width: '100%',
    padding: '14px',
    border: 'none',
    borderRadius: '12px',
    background:
      'linear-gradient(90deg, #2563eb, #1d4ed8)',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s'
  },

  registerText: {
    textAlign: 'center',
    marginTop: '22px',
    color: '#475569'
  },

  registerLink: {
    marginLeft: '8px',
    color: '#2563eb',
    fontWeight: 'bold',
    textDecoration: 'none'
  }
};

export default Login;