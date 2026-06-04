import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Wishlist() {

  const [wishlist, setWishlist] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {

    loadWishlist();

  }, []);

  // LOAD WISHLIST
  const loadWishlist = () => {

    axios.get(
      'http://localhost:5000/api/wishlist',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(res => {

      setWishlist(res.data);

    })
    .catch(() => {

      toast.error('Failed to load wishlist');

    });
  };

  // REMOVE
  const removeWishlist = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/wishlist/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success('Removed from wishlist');

      loadWishlist();

    } catch (err) {

      toast.error('Remove failed');
    }
  };

  // ADD TO CART
  const addToCart = async (id) => {

    try {

      await axios.post(
        'http://localhost:5000/api/cart',
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success('Added to cart');

    } catch (err) {

      toast.error('Cart failed');
    }
  };

  return (

    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>

        <h1 style={styles.title}>
          My Wishlist ❤️
        </h1>

        <p style={styles.subtitle}>
          Save your favorite products for later
        </p>

      </div>

      {/* EMPTY */}
      {wishlist.length === 0 && (

        <div style={styles.emptyBox}>

          <h2>No items in wishlist 💔</h2>

          <p>
            Add products to your wishlist
          </p>

        </div>
      )}

      {/* PRODUCTS */}
      <div style={styles.grid}>

        {wishlist.map(item => (

          <div
            key={item._id}
            style={styles.card}
          >

            {/* SALE BADGE */}
            <span style={styles.badge}>
              ❤️ Saved
            </span>

            <div style={styles.imgContainer}>

              <img
                src={item.image}
                alt={item.name}
                style={styles.img}
              />

            </div>

            <h3 style={styles.name}>
              {item.name}
            </h3>

            <p style={styles.rating}>
              ★★★★★
            </p>

            <p style={styles.price}>
              ₹ {item.price}
            </p>

            {/* BUTTONS */}
            <div style={styles.btnContainer}>

              <button
                onClick={() => addToCart(item._id)}
                style={styles.cartBtn}
              >
                Add to Cart
              </button>

              <button
                onClick={() => removeWishlist(item._id)}
                style={styles.removeBtn}
              >
                Remove
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

const styles = {

  container: {
    padding: '35px',
    background: '#eef2f7',
    minHeight: '100vh'
  },

  header: {
    textAlign: 'center',
    marginBottom: '35px'
  },

  title: {
    fontSize: '42px',
    color: '#1e293b',
    marginBottom: '10px'
  },

  subtitle: {
    color: '#555',
    fontSize: '18px'
  },

  emptyBox: {
    background: '#fff',
    padding: '40px',
    borderRadius: '16px',
    textAlign: 'center',
    marginBottom: '30px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
  },

  grid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit, minmax(260px,1fr))',
    gap: '25px'
  },

  card: {
    background: '#fff',
    borderRadius: '18px',
    padding: '15px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    transition: '0.3s',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
  },

  badge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    background: '#ff4081',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 'bold',
    zIndex: 10
  },

  imgContainer: {
    overflow: 'hidden',
    borderRadius: '14px'
  },

  img: {
    width: '100%',
    height: '220px',
    objectFit: 'cover',
    borderRadius: '14px',
    transition: '0.4s'
  },

  name: {
    marginTop: '15px',
    fontSize: '20px',
    color: '#1e293b'
  },

  rating: {
    color: '#ffc107',
    margin: '8px 0'
  },

  price: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: '15px'
  },

  btnContainer: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center'
  },

  cartBtn: {
    padding: '10px 16px',
    background:
      'linear-gradient(90deg,#1e3c72,#2a5298)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },

  removeBtn: {
    padding: '10px 16px',
    background: '#ff4d4d',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default Wishlist;