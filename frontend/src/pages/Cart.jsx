import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Cart() {


  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const token = localStorage.getItem('token');

  // LOAD CART
  const loadCart = () => {

    axios.get(
      'https://jwtlogin-5gx2.onrender.com/api/cart',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(res => {

      setCart(
        Array.isArray(res.data)
          ? res.data
          : []
      );

    })
    .catch(() => {
      setCart([]);
    });
  };

  useEffect(() => {
    loadCart();
  }, []);

  // REMOVE
  const remove = async (id) => {

    try {

      await axios.delete(
        `https://jwtlogin-5gx2.onrender.com/api/cart/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success('Item removed');

      loadCart();

    } catch {

      toast.error('Remove failed');
    }
  };

  // UPDATE QUANTITY
  const updateQty = async (id, qty) => {

    if (qty < 1) return;

    try {

      await axios.put(
        `https://jwtlogin-5gx2.onrender.com/api/cart/${id}`,
        { quantity: qty },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      loadCart();

    } catch {

      toast.error('Update failed');
    }
  };

  // PAYMENT + ORDER
  const order = async () => {

    try {

      // CREATE PAYMENT ORDER
      const { data } = await axios.post(

        'https://jwtlogin-5gx2.onrender.com/api/payment/create-order',

        {
          amount: totalPrice
        },

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // RAZORPAY OPTIONS
      const options = {

        key: 'rzp_test_SoMKSrjutN6Plm',

        amount: data.amount,

        currency: data.currency,

        name: 'MyShop',

        description: 'Order Payment',

        order_id: data.id,

        handler: async function () {

          // PLACE ORDER AFTER PAYMENT SUCCESS
          await axios.post(

            'https://jwtlogin-5gx2.onrender.com/api/orders',

            {},

            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          toast.success('Payment Successful');

          setCart([]);
        },

        prefill: {

          name: 'Customer',

          email: 'customer@gmail.com'
        },

        theme: {
          color: '#1e3c72'
        }
      };

      // OPEN RAZORPAY
      const razor = new window.Razorpay(options);

      razor.open();

    } catch (err) {

      toast.error('Payment Failed');
    }
  };

  // TOTAL
  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      (item.product?.price || 0)
      * item.quantity,
    0
  );

  return (

    <div style={styles.container}>

      {/* PAGE TITLE */}
      <div style={styles.topBanner}>

        <h1 style={styles.bannerTitle}>
          Shopping Cart 🛒
        </h1>

        <p style={styles.bannerText}>
          Review your items and place your order
        </p>

      </div>

      {cart.length > 0 ? (

        <>
          {cart.map(item => (

            <div
              key={item._id}
              style={styles.card}
            >

              {/* LEFT */}
              <div style={styles.left}>

                <img
                  src={item.product?.image}
                  alt=""
                  style={styles.img}
                />

                <div>

                  <h3 style={styles.productName}>
                    {item.product?.name}
                  </h3>

                  <p style={styles.price}>
                    ₹ {item.product?.price}
                  </p>

                  <p style={styles.stock}>
                    In Stock ✅
                  </p>

                </div>

              </div>

              {/* RIGHT */}
              <div style={styles.right}>

                {/* QUANTITY */}
                <div style={styles.qtyBox}>

                  <button
                    style={styles.qtyBtn}
                    onClick={() =>
                      updateQty(
                        item.product._id,
                        item.quantity - 1
                      )
                    }
                  >
                    -
                  </button>

                  <span style={styles.qtyText}>
                    {item.quantity}
                  </span>

                  <button
                    style={styles.qtyBtn}
                    onClick={() =>
                      updateQty(
                        item.product._id,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>

                </div>

                {/* SUBTOTAL */}
                <p style={styles.subtotal}>
                  ₹ {
                    (item.product?.price || 0)
                    * item.quantity
                  }
                </p>

                {/* REMOVE */}
                <button
                  onClick={() =>
                    remove(item.product._id)
                  }
                  style={styles.removeBtn}
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

          {/* PRICE BOX */}
          <div style={styles.totalWrapper}>

            <div style={styles.totalBox}>

              <h2 style={styles.totalTitle}>
                Order Summary
              </h2>

              <div style={styles.totalRow}>
                <span>Items</span>
                <span>{cart.length}</span>
              </div>

              <div style={styles.totalRow}>
                <span>Delivery</span>
                <span style={{ color: 'green' }}>
                  FREE
                </span>
              </div>

              <div style={styles.totalRow}>
                <span>Total Amount</span>
                <span style={styles.totalPrice}>
                  ₹ {totalPrice}
                </span>
              </div>

              <button
              onClick={() => navigate('/checkout')}
                style={styles.orderBtn}
              >
                Proceed To Checkout
              </button>

            </div>

          </div>
        </>

      ) : (

        <div style={styles.emptyContainer}>

          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt=""
            style={styles.emptyImg}
          />

          <h2>
            Your cart is empty
          </h2>

          <p>
            Add products to continue shopping
          </p>

        </div>
      )}

    </div>
  );
}


// STYLES
const styles = {

  container: {
    padding: '30px',
    minHeight: '100vh',
    background: '#eef2f7'
  },

  topBanner: {
    background:
      'linear-gradient(135deg, #1e3c72, #2a5298)',
    padding: '35px',
    borderRadius: '18px',
    color: '#fff',
    marginBottom: '35px',
    textAlign: 'center',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
  },

  bannerTitle: {
    fontSize: '38px',
    marginBottom: '10px'
  },

  bannerText: {
    fontSize: '17px',
    opacity: 0.9
  },

  card: {
    background: '#fff',
    padding: '20px',
    borderRadius: '18px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    transition: '0.3s',
    flexWrap: 'wrap',
    gap: '20px'
  },

  left: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    flexWrap: 'wrap'
  },

  img: {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '14px'
  },

  productName: {
    marginBottom: '10px',
    color: '#1e293b'
  },

  price: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#16a34a'
  },

  stock: {
    marginTop: '8px',
    color: 'green',
    fontWeight: '500'
  },

  right: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'center'
  },

  qtyBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },

  qtyBtn: {
    width: '38px',
    height: '38px',
    border: 'none',
    background:
      'linear-gradient(90deg, #1e3c72, #2a5298)',
    color: '#fff',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 'bold'
  },

  qtyText: {
    fontSize: '20px',
    fontWeight: 'bold'
  },

  subtotal: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#0f172a'
  },

  removeBtn: {
    background: '#ef4444',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },

  totalWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '35px'
  },

  totalBox: {
    width: '350px',
    background: '#fff',
    padding: '25px',
    borderRadius: '18px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
  },

  totalTitle: {
    marginBottom: '20px',
    color: '#1e293b'
  },

  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
    fontSize: '16px'
  },

  totalPrice: {
    fontWeight: 'bold',
    color: '#16a34a',
    fontSize: '20px'
  },

  orderBtn: {
    marginTop: '20px',
    width: '100%',
    padding: '14px',
    border: 'none',
    background:
      'linear-gradient(90deg, #16a34a, #22c55e)',
    color: '#fff',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  },

  emptyContainer: {
    textAlign: 'center',
    marginTop: '80px'
  },

  emptyImg: {
    width: '180px',
    marginBottom: '20px',
    opacity: 0.8
  }
};

export default Cart;