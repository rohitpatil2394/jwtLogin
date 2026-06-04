import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const token = localStorage.getItem('token');

  const user = JSON.parse(
    localStorage.getItem('user')
  );

  useEffect(() => {

    axios.get(
      `http://localhost:5000/api/products/${id}`
    )
    .then(res => {
      setProduct(res.data);
    })
    .catch(err => {
      console.log(err);
    });

  }, [id]);

  // ✅ ADD TO CART
  const addToCart = async () => {

    try {

      await axios.post(
        'http://localhost:5000/api/cart',
        {
          productId: product._id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Added to cart');

    } catch (err) {

      alert(
        err.response?.data?.message || 'Add failed'
      );
    }
  };

  if (!product) {
    return <h2 style={{ padding: '30px' }}>Loading...</h2>;
  }

  const styles = {

    container: {
      padding: '40px',
      background: '#f4f6f9',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },

    card: {
      background: '#fff',
      width: '90%',
      maxWidth: '1000px',
      borderRadius: '15px',
      padding: '30px',
      display: 'flex',
      gap: '40px',
      boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
    },

    imageBox: {
      flex: 1
    },

    image: {
      width: '100%',
      height: '450px',
      objectFit: 'cover',
      borderRadius: '12px'
    },

    details: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },

    title: {
      fontSize: '34px',
      marginBottom: '10px'
    },

    price: {
      fontSize: '28px',
      color: '#28a745',
      fontWeight: 'bold',
      marginBottom: '15px'
    },

    desc: {
      color: '#555',
      lineHeight: '1.7',
      marginBottom: '20px'
    },

    category: {
      marginBottom: '10px',
      fontWeight: 'bold'
    },

    stock: {
      marginBottom: '20px',
      color: '#ff6600',
      fontWeight: 'bold'
    },

    btn: {
      padding: '14px',
      background: 'linear-gradient(90deg,#1e3c72,#2a5298)',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px'
    }
  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        {/* IMAGE */}
        <div style={styles.imageBox}>
          <img
            src={product.image}
            alt={product.name}
            style={styles.image}
          />
        </div>

        {/* DETAILS */}
        <div style={styles.details}>

          <h1 style={styles.title}>
            {product.name}
          </h1>

          <div style={styles.price}>
            ₹ {product.price}
          </div>

          <div style={styles.category}>
            Category: {product.category}
          </div>

          <div style={styles.stock}>
            Stock: {product.stock}
          </div>

          <p style={styles.desc}>
            {product.description}
          </p>

          {/* USER ONLY */}
          {user?.role !== 'admin' && (

            <button
              onClick={addToCart}
              style={styles.btn}
            >
              Add To Cart
            </button>
          )}

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;