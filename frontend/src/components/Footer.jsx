function Footer() {

  const styles = {

    footer: {
      background: '#0f172a',
      color: '#fff',
      padding: '50px 30px 20px',
      marginTop: '50px'
    },

    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '30px'
    },

    title: {
      fontSize: '22px',
      marginBottom: '15px',
      color: '#facc15'
    },

    text: {
      color: '#cbd5e1',
      lineHeight: '1.8'
    },

    link: {
      display: 'block',
      color: '#cbd5e1',
      textDecoration: 'none',
      marginBottom: '10px',
      transition: '0.3s'
    },

    bottom: {
      textAlign: 'center',
      marginTop: '35px',
      borderTop: '1px solid #334155',
      paddingTop: '20px',
      color: '#94a3b8'
    }
  };

  return (

    <footer style={styles.footer}>

      <div style={styles.container}>

        {/* COMPANY */}
        <div>

          <h2 style={styles.title}>
            ShopEase
          </h2>

          <p style={styles.text}>
            Modern e-commerce platform developed using
            MERN Stack technology with secure
            authentication, cart system, admin dashboard,
            and responsive UI design.
          </p>

        </div>

        {/* LINKS */}
        <div>

          <h2 style={styles.title}>
            Quick Links
          </h2>

          <a href="/" style={styles.link}>
            Home
          </a>

          <a href="/cart" style={styles.link}>
            Cart
          </a>

          <a href="/orders" style={styles.link}>
            Orders
          </a>

          <a href="/login" style={styles.link}>
            Login
          </a>

        </div>

        {/* FEATURES */}
        <div>

          <h2 style={styles.title}>
            Features
          </h2>

          <p style={styles.text}>
            ✔ JWT Authentication
          </p>

          <p style={styles.text}>
            ✔ Admin Dashboard
          </p>

          <p style={styles.text}>
            ✔ Add To Cart
          </p>

          <p style={styles.text}>
            ✔ Order Management
          </p>

        </div>

        {/* CONTACT */}
        <div>

          <h2 style={styles.title}>
            Contact
          </h2>

          <p style={styles.text}>
            Pune, Maharashtra
          </p>

          <p style={styles.text}>
            shop@email.com
          </p>

          <p style={styles.text}>
            +91 9876543210
          </p>

        </div>

      </div>

      {/* BOTTOM */}
      <div style={styles.bottom}>
        © 2026 ShopEase | All Rights Reserved
      </div>

    </footer>
  );
}

export default Footer;