import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './modules/home/Home';
import Gallery from './modules/gallery/Gallery';
import ProductPage from './modules/productPage/ProductPage';
import Login from './modules/userModules/login/Login';
import Register from './modules/userModules/register/Register';
import AdminAddProduct from './modules/addProducts/AdminAddProduct';
import Header from './modules/header/Header';

function App() {
  return (
    <div className="min-h-screen bg-[url('/bg-sweet-candles.jpg')] bg-cover bg-center">
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/add" element={<AdminAddProduct />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
