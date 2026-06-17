import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('https://jwtlogin-5gx2.onrender.com/api/orders/all', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setOrders(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <h2>Admin Orders</h2>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map(order => (
        <div key={order._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p><strong>User:</strong> {order.user?.email}</p>
          <p><strong>Total:</strong> ₹ {order.totalAmount}</p>
          <p><strong>Status:</strong> {order.status}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;