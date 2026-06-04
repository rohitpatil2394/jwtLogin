import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  // REGISTER
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        'http://localhost:5000/api/auth/register',
        user
      );

      toast.success(res.data.message);

      navigate('/login');

    } catch (err) {

      toast.error(
        err.response?.data?.message
      );
    }
  };

  return (

    <div style={styles.container}>

      {/* LEFT SIDE */}
      <div style={styles.leftSection}>

        <div style={styles.overlay}>

          <h1 style={styles.brand}>
            MyShop
          </h1>

          <h2 style={styles.heading}>
            Create Your Account
          </h2>

          <p style={styles.text}>
            Join our premium ecommerce platform
            and explore amazing products with
            best offers and secure shopping.
          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div style={styles.rightSection}>

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >

          <h2 style={styles.formTitle}>
            Register
          </h2>

          <p style={styles.subtitle}>
            Start shopping today
          </p>

          {/* NAME */}
          <input
            type="text"
            placeholder="Enter your name"
            style={styles.input}
            required
            onChange={(e) =>
              setUser({
                ...user,
                name: e.target.value
              })
            }
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Enter your email"
            style={styles.input}
            required
            onChange={(e) =>
              setUser({
                ...user,
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
              setUser({
                ...user,
                password: e.target.value
              })
            }
          />

          {/* ROLE */}
          <select
            style={styles.select}
            onChange={(e) =>
              setUser({
                ...user,
                role: e.target.value
              })
            }
          >
            <option value="user">
              User
            </option>

            <option value="admin">
              Admin
            </option>

          </select>

          {/* BUTTON */}
          <button
            type="submit"
            style={styles.button}
          >
            Create Account
          </button>

          {/* LOGIN LINK */}
          <p style={styles.loginText}>

            Already have account?

            <Link
              to="/login"
              style={styles.loginLink}
            >
              Login
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
      'url(https://images.unsplash.com/photo-1522199710521-72d69614c702?q=80&w=1600&auto=format&fit=crop)',
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
      'linear-gradient(rgba(15,23,42,0.75), rgba(30,41,59,0.8))',
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
    fontSize: '38px',
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
    boxSizing: 'border-box',
    transition: '0.3s'
  },

  select: {
    width: '100%',
    padding: '14px',
    marginBottom: '22px',
    borderRadius: '12px',
    border: '1px solid #cbd5e1',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
    background: '#fff'
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

  loginText: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#475569'
  },

  loginLink: {
    marginLeft: '8px',
    color: '#2563eb',
    fontWeight: 'bold',
    textDecoration: 'none'
  }
};

export default Register;