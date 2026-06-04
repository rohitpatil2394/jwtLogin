import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem('user')
  ) || {};

  const token = localStorage.getItem('token');

  const [cartCount, setCartCount] =
    useState(0);

  // FETCH CART COUNT
  useEffect(() => {

    if (token && user.role !== 'admin') {

      axios.get(
        'http://localhost:5000/api/cart',
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      )
      .then(res =>
        setCartCount(res.data.length)
      )
      .catch(() => setCartCount(0));
    }

  }, [token]);



  // LOGOUT
  const logout = () => {

    localStorage.clear();

    navigate('/login');
  };



  // ACTIVE LINK STYLE
  const navLinkStyle = ({ isActive }) => ({

    ...styles.link,

    color: isActive
      ? '#facc15'
      : '#ffffff'
  });



  return (

    <nav style={styles.nav}>


      {/* LEFT */}
      <div style={styles.leftSection}>


        {/* LOGO */}
        <div
          style={styles.logo}
          onClick={() => navigate('/')}
        >
          MyShop
        </div>


        {/* SEARCH */}
        <div style={styles.searchBox}>

          <input
            type="text"
            placeholder="Search..."
            style={styles.searchInput}
          />

          <button style={styles.searchBtn}>
            🔍
          </button>

        </div>

      </div>



      {/* RIGHT */}
      <div style={styles.rightSection}>


        {/* HOME */}
        <NavLink
          to="/"
          style={navLinkStyle}
        >
          Home
        </NavLink>



        {/* NOT LOGIN */}
        {!user.email && (
          <>

            <NavLink
              to="/login"
              style={navLinkStyle}
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              style={navLinkStyle}
            >
              Register
            </NavLink>

          </>
        )}



        {/* USER */}
        {user.email &&
          user.role !== 'admin' && (
          <>

            <NavLink
              to="/wishlist"
              style={navLinkStyle}
            >
              Wishlist
            </NavLink>

            <NavLink
              to="/orders"
              style={navLinkStyle}
            >
              My Orders
            </NavLink>

            <NavLink
              to="/cart"
              style={styles.cartLink}
            >

              Cart

              <span style={styles.cartBadge}>
                {cartCount}
              </span>

            </NavLink>

          </>
        )}



        {/* ADMIN */}
        {user.role === 'admin' && (
          <>

            <NavLink
              to="/add-product"
              style={navLinkStyle}
            >
              Add Product
            </NavLink>

            <NavLink
              to="/admin-orders"
              style={navLinkStyle}
            >
              Orders
            </NavLink>

          </>
        )}



        {/* LOGOUT */}
        {user.email && (

          <button
            onClick={logout}
            style={styles.logoutBtn}
          >
            Logout
          </button>
        )}

      </div>

    </nav>
  );
}



// STYLES
const styles = {

  nav: {
    width: '100%',
    background:
      'linear-gradient(90deg,#0f172a,#1e293b)',
    padding: '12px 25px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxSizing: 'border-box'
  },

  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap'
  },

  logo: {
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },

  searchBox: {
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    width: '250px',
    height: '38px'
  },

  searchInput: {
    border: 'none',
    outline: 'none',
    padding: '10px',
    width: '100%',
    fontSize: '14px'
  },

  searchBtn: {
    border: 'none',
    background: '#facc15',
    padding: '10px 14px',
    cursor: 'pointer',
    height: '100%'
  },

  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    flexWrap: 'wrap'
  },

  link: {
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '500',
    transition: '0.3s'
  },

  cartLink: {
    position: 'relative',
    textDecoration: 'none',
    color: '#fff',
    fontSize: '15px',
    fontWeight: '500'
  },

  cartBadge: {
    position: 'absolute',
    top: '-10px',
    right: '-14px',
    background: '#ef4444',
    color: '#fff',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '11px',
    fontWeight: 'bold'
  },

  logoutBtn: {
    border: 'none',
    background: '#ef4444',
    color: '#fff',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px'
  }
};

export default Navbar;