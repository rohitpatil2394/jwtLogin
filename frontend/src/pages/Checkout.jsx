import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    address: '',
    city: '',
    pincode: ''
  });

  // LOAD OLD ADDRESS
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/address', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.data) {
          setForm(res.data);
        }
      });
  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // SAVE ADDRESS
  const saveAddress = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/address',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success('Address saved');
      navigate('/payment');
    } catch {
      toast.error('Save failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Delivery Address</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          style={styles.input}
        />

        <textarea
          name="address"
          placeholder="Full Address"
          value={form.address}
          onChange={handleChange}
          style={styles.textarea}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
          style={styles.input}
        />

        <button onClick={saveAddress} style={styles.button}>
          Save Address
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
    background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    padding: '20px'
  },

  card: {
    width: '420px',
    background: '#fff',
    padding: '35px',
    borderRadius: '18px',
    boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
    transition: '0.3s',
  },

  title: {
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '24px',
    fontWeight: '700',
    color: '#333'
  },

  input: {
    width: '100%',
    padding: '12px 14px',
    marginBottom: '12px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    fontSize: '14px',
    outline: 'none',
    background: '#f9f9f9',
    transition: '0.3s'
  },

  textarea: {
    width: '100%',
    padding: '12px 14px',
    marginBottom: '12px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    height: '90px',
    fontSize: '14px',
    outline: 'none',
    background: '#f9f9f9',
    resize: 'none',
    transition: '0.3s'
  },

  button: {
    width: '100%',
    padding: '14px',
    border: 'none',
    borderRadius: '12px',
    background: 'linear-gradient(90deg, #ff512f, #dd2476)',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s',
    boxShadow: '0 8px 20px rgba(221, 36, 118, 0.3)'
  }
};

export default Checkout;