import { useState } from 'react';
import axios from 'axios';

function AddProduct() {
  const [data, setData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: ''
  });

  const [image, setImage] = useState(null);

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      padding: '40px'
    },
    form: {
      width: '300px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },
    input: {
      padding: '10px'
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/products', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Product added');
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Add Product</h2>
        <input placeholder="Name" style={styles.input} onChange={e => setData({ ...data, name: e.target.value })} />
        <input placeholder="Price" style={styles.input} onChange={e => setData({ ...data, price: e.target.value })} />
        <input placeholder="Category" style={styles.input} onChange={e => setData({ ...data, category: e.target.value })} />
        <input placeholder="Stock" style={styles.input} onChange={e => setData({ ...data, stock: e.target.value })} />
        <textarea placeholder="Description" style={styles.input} onChange={e => setData({ ...data, description: e.target.value })}></textarea>
        <input type="file" onChange={e => setImage(e.target.files[0])} />
        <button>Add</button>
      </form>
    </div>
  );
}

export default AddProduct;