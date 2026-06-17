import axios from 'axios';

import { toast } from 'react-toastify';


function Payment() {

  const token = localStorage.getItem('token');


  const handlePayment = async () => {

    try {

      // GET CART
      const cartRes = await axios.get(
        'https://jwtlogin-5gx2.onrender.com/api/cart',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const cart = cartRes.data;

      // TOTAL
      const total = cart.reduce(
        (sum, item) =>
          sum +
          item.product.price * item.quantity,
        0
      );

      // CREATE ORDER
      const orderRes = await axios.post(
        'https://jwtlogin-5gx2.onrender.com/api/payment/create-order',
        { amount: total },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const options = {

        key: 'rzp_test_SoMKSrjutN6Plm',

        amount: orderRes.data.amount,

        currency: 'INR',

        name: 'MyShop',

        description: 'Order Payment',

        order_id: orderRes.data.id,

        handler: async function () {

          // SAVE ORDER
          await axios.post(
            'https://jwtlogin-5gx2.onrender.com/api/orders',
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          toast.success(
            'Payment Successful'
          );
        },

        theme: {
          color: '#1e3c72'
        }
      };

      const razor = new window.Razorpay(
        options
      );

      razor.open();

    } catch {

      toast.error('Payment failed');
    }
  };


  return (

    <div style={styles.container}>

      <div style={styles.box}>

        <h1>
          Payment Checkout
        </h1>

        <p>
          Complete your payment securely
        </p>

        <button
          onClick={handlePayment}
          style={styles.btn}
        >
          Pay Now
        </button>

      </div>

    </div>
  );
}


const styles = {

  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#eef2f7'
  },

  box: {
    background: '#fff',
    padding: '40px',
    borderRadius: '16px',
    textAlign: 'center',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
  },

  btn: {
    marginTop: '20px',
    padding: '14px 25px',
    border: 'none',
    background:
      'linear-gradient(90deg, #16a34a, #22c55e)',
    color: '#fff',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};

export default Payment;