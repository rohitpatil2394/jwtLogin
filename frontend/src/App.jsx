import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import Cart from './pages/Cart';
import MyOrders from './pages/MyOrders';
import AdminOrders from './pages/AdminOrders';
import ProductDetails from './pages/ProductDetails';
import Footer from './components/Footer';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Products />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<MyOrders />} />

        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/admin-orders" element={<AdminOrders />} />

        <Route
  path="/product/:id"
  element={<ProductDetails />}

/>
<Route path="/wishlist" element={<Wishlist />} />

<Route
  path="/checkout"
  element={<Checkout />}
/>
<Route
  path="/payment"
  element={<Payment />}
/>

      </Routes>
       <Footer />

    </>
  );
}

export default App;