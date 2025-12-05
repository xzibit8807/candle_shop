import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './modules/home/Home';
import Gallery from './modules/gallery/Gallery';
import ProductPage from './modules/productPage/ProductPage';
import Login from './modules/userModules/login/Login';
import Register from './modules/userModules/register/Register';
import Header from './modules/header/Header';
import AdminOrders from "./modules/userModules/admin/adminDashboard/AdminOrders";
import AdminProducts from "./modules/userModules/admin/adminDashboard/AdminProduct";
import AdminLayout from "./modules/userModules/admin/adminDashboard/AdminLayout";

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

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/add" element={<div>Add product</div>} />
            <Route path="products/edit/:id" element={<div>Edit product</div>} />
          </Route>

        </Routes>
      </main>
    </div>
  )
}

export default App
