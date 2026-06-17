import { useEffect, useState } from 'react';
import axios from 'axios';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('https://jwtlogin-5gx2.onrender.com/api/orders/my', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h2 style={styles.title}>My Orders</h2>

        {orders.length === 0 ? (
          <p style={styles.empty}>No orders found 😔</p>
        ) : (
          orders.map(order => (
            <div key={order._id} style={styles.card}>
              <div style={styles.row}>
                <div>
                  <p style={styles.label}>Order ID</p>
                  <p style={styles.value}>{order._id}</p>
                </div>

                <div>
                  <p style={styles.label}>Status</p>
                  <p
                    style={{
                      ...styles.status,
                      background:
                        order.status === 'Delivered'
                          ? '#d4edda'
                          : order.status === 'Pending'
                          ? '#fff3cd'
                          : '#f8d7da',
                      color:
                        order.status === 'Delivered'
                          ? '#155724'
                          : order.status === 'Pending'
                          ? '#856404'
                          : '#721c24'
                    }}
                  >
                    {order.status}
                  </p>
                </div>
              </div>

              <div style={styles.bottomRow}>
                <p style={styles.amount}>
                  Total: <span>₹ {order.totalAmount}</span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    padding: '30px',
    display: 'flex',
    justifyContent: 'center'
  },

  wrapper: {
    width: '800px'
  },

  title: {
    color: '#fff',
    marginBottom: '20px',
    fontSize: '28px',
    fontWeight: '700',
    textAlign: 'center'
  },

  empty: {
    color: '#fff',
    textAlign: 'center',
    fontSize: '18px',
    marginTop: '40px'
  },

  card: {
    background: '#fff',
    padding: '20px',
    borderRadius: '14px',
    marginBottom: '15px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    transition: '0.3s'
  },

  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px'
  },

  bottomRow: {
    borderTop: '1px solid #eee',
    paddingTop: '10px',
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'flex-end'
  },

  label: {
    fontSize: '12px',
    color: '#888',
    marginBottom: '4px'
  },

  value: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333'
  },

  amount: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#222'
  },

  status: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    display: 'inline-block'
  }
};

export default MyOrders;