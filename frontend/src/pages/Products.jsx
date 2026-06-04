import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Products() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const token = localStorage.getItem('token');

  const user = JSON.parse(
    localStorage.getItem('user')
  ) || {};

  // LOAD PRODUCTS
  useEffect(() => {

    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data));

  }, []);

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

      toast.error(err.response?.data?.message);
    }
  };

  // ADD TO WISHLIST
  const addWishlist = async (id) => {

    try {

      await axios.post(
        'http://localhost:5000/api/wishlist',
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success('Added to wishlist ❤️');

    } catch (err) {

      toast.error(
        err.response?.data?.message || 'Wishlist failed'
      );
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {

    if (!window.confirm('Delete this product?')) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success('Product deleted');

      setProducts(
        products.filter(p => p._id !== id)
      );

    } catch (err) {

      toast.error('Delete failed');
    }
  };

  // FILTER PRODUCTS
  const filteredProducts = products.filter(p => {

    const matchesSearch =
      p.name.toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === 'All' ||
      p.category === category;

    return matchesSearch && matchesCategory;
  });

  return (

    <div style={styles.container}>

      {/* HERO BANNER */}
      <div style={styles.banner}>

        <div style={styles.overlay}>

          <div style={styles.bannerContent}>

            <h1 style={styles.bannerTitle}>
              Mega Sale 2026
            </h1>

            <p style={styles.bannerText}>
              Discover amazing products with huge discounts
            </p>

            <button style={styles.shopBtn}>
              Shop Now
            </button>

          </div>

        </div>

      </div>

      {/* CATEGORY SECTION */}
      <h2 style={styles.categoryTitle}>
        Shop By Categories
      </h2>

      <div style={styles.categoryContainer}>

        <div style={styles.categoryCard}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1041/1041889.png"
            alt=""
            style={styles.categoryIcon}
          />
          <p>Electronics</p>
        </div>

        <div style={styles.categoryCard}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/892/892458.png"
            alt=""
            style={styles.categoryIcon}
          />
          <p>Fashion</p>
        </div>

        <div style={styles.categoryCard}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
            alt=""
            style={styles.categoryIcon}
          />
          <p>Shoes</p>
        </div>

        <div style={styles.categoryCard}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2933/2933245.png"
            alt=""
            style={styles.categoryIcon}
          />
          <p>Mobiles</p>
        </div>

        <div style={styles.categoryCard}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png"
            alt=""
            style={styles.categoryIcon}
          />
          <p>Groceries</p>
        </div>

      </div>

      {/* CATEGORY FILTER BUTTONS */}
      <div style={styles.filterContainer}>

        <button
          onClick={() => setCategory('All')}
          style={
            category === 'All'
              ? styles.activeFilterBtn
              : styles.filterBtn
          }
        >
          All
        </button>

        <button
          onClick={() => setCategory('Electronics')}
          style={
            category === 'Electronics'
              ? styles.activeFilterBtn
              : styles.filterBtn
          }
        >
          Electronics
        </button>

        <button
          onClick={() => setCategory('Fashion')}
          style={
            category === 'Fashion'
              ? styles.activeFilterBtn
              : styles.filterBtn
          }
        >
          Fashion
        </button>

        <button
          onClick={() => setCategory('Shoes')}
          style={
            category === 'Shoes'
              ? styles.activeFilterBtn
              : styles.filterBtn
          }
        >
          Shoes
        </button>

        <button
          onClick={() => setCategory('Mobiles')}
          style={
            category === 'Mobiles'
              ? styles.activeFilterBtn
              : styles.filterBtn
          }
        >
          Mobiles
        </button>

      </div>

      {/* SEARCH */}
      <div style={styles.searchBox}>

        <input
          type="text"
          placeholder="Search products..."
          style={styles.searchInput}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <h2 style={styles.title}>
        Explore Products
      </h2>

      {/* PRODUCTS */}
      <div style={styles.grid}>

        {filteredProducts.map(p => (

          <Link
            key={p._id}
            to={`/product/${p._id}`}
            style={{
              textDecoration: 'none',
              color: 'inherit'
            }}
          >

            <div

              style={styles.card}

              onMouseEnter={(e) => {

                e.currentTarget.style.transform =
                  'translateY(-8px)';

                e.currentTarget.style.boxShadow =
                  '0 12px 25px rgba(0,0,0,0.18)';

                const img =
                  e.currentTarget.querySelector('img');

                if (img) {

                  img.style.transform = 'scale(1.08)';
                }
              }}

              onMouseLeave={(e) => {

                e.currentTarget.style.transform =
                  'translateY(0px)';

                e.currentTarget.style.boxShadow =
                  '0 4px 12px rgba(0,0,0,0.08)';

                const img =
                  e.currentTarget.querySelector('img');

                if (img) {

                  img.style.transform = 'scale(1)';
                }
              }}
            >

              <span style={styles.badge}>
                SALE
              </span>

              <img
                src={p.image}
                alt={p.name}
                style={styles.img}
              />

              <h3 style={styles.name}>
                {p.name}
              </h3>

              <p style={styles.rating}>
                ★★★★★
              </p>

              <p style={styles.price}>
                ₹ {p.price}
              </p>

              {/* USER */}
              {user &&
                user.role !== 'admin' && (

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '10px',
                      marginTop: '10px'
                    }}
                  >

                    <button

                      onClick={(e) => {

                        e.preventDefault();

                        addToCart(p._id);
                      }}

                      style={styles.btn}
                    >
                      Add to Cart
                    </button>

                    <button

                      onClick={(e) => {

                        e.preventDefault();

                        addWishlist(p._id);
                      }}

                      style={styles.wishlistBtn}
                    >
                      ❤️ Wishlist
                    </button>

                  </div>
                )}

              {/* ADMIN */}
              {user?.role === 'admin' && (

                <button

                  onClick={(e) => {

                    e.preventDefault();

                    deleteProduct(p._id);
                  }}

                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              )}

            </div>

          </Link>

        ))}

      </div>

    </div>
  );
}


// STYLES
const styles = {

  container: {
    padding: '30px',
    background: '#d5d9e0',
    minHeight: '100vh'
  },

  banner: {
    width: '100%',
    height: '420px',
    borderRadius: '18px',
    overflow: 'hidden',
    marginBottom: '35px',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1600&auto=format&fit=crop)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
  },

  overlay: {
    width: '100%',
    height: '100%',
    background:
      'linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.2))',
    display: 'flex',
    alignItems: 'center'
  },

  bannerContent: {
    color: '#fff',
    paddingLeft: '60px',
    maxWidth: '500px'
  },

  bannerTitle: {
    fontSize: '56px',
    fontWeight: 'bold',
    marginBottom: '15px'
  },

  bannerText: {
    fontSize: '20px',
    lineHeight: '1.6',
    marginBottom: '25px'
  },

  shopBtn: {
    padding: '14px 28px',
    background: '#ff9900',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },

  categoryTitle: {
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1e293b'
  },

  categoryContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '25px',
    flexWrap: 'wrap',
    marginBottom: '40px'
  },

  categoryCard: {
    background: '#fff',
    width: '140px',
    height: '140px',
    borderRadius: '18px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: '0.3s'
  },

  categoryIcon: {
    width: '60px',
    marginBottom: '12px'
  },

  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    flexWrap: 'wrap',
    marginBottom: '25px'
  },

  filterBtn: {
    padding: '10px 18px',
    border: 'none',
    borderRadius: '30px',
    background: '#fff',
    color: '#1e293b',
    cursor: 'pointer',
    fontWeight: 'bold'
  },

  activeFilterBtn: {
    padding: '10px 18px',
    border: 'none',
    borderRadius: '30px',
    background: '#1e3c72',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold'
  },

  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '28px'
  },

  searchBox: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px'
  },

  searchInput: {
    width: '60%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none'
  },

  grid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit, minmax(230px, 1fr))',
    gap: '20px'
  },

  card: {
    background: '#fff',
    padding: '15px',
    borderRadius: '16px',
    textAlign: 'center',
    position: 'relative',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'all 0.35s ease',
    overflow: 'visible',
    cursor: 'pointer'
  },

  img: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '12px',
    transition: 'transform 0.4s ease'
  },

  name: {
    margin: '10px 0'
  },

  price: {
    color: '#28a745',
    fontWeight: 'bold'
  },

  rating: {
    color: '#ffc107'
  },

  badge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    background:
      'linear-gradient(90deg, #ff0000, #ff4d4d)',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 'bold',
    zIndex: 10
  },

  btn: {
    marginTop: '10px',
    padding: '8px 12px',
    background:
      'linear-gradient(90deg, #1e3c72, #2a5298)',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },

  wishlistBtn: {
    marginTop: '10px',
    padding: '8px 12px',
    background: '#ff4081',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },

  deleteBtn: {
    marginTop: '10px',
    padding: '8px',
    background: 'red',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default Products;