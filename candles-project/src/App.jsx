import { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Header from "./components/header/Header";
import Home from "./modules/home/Home";
import Gallery from "./modules/gallery/Gallery";
import Login from "./modules/userModules/login/Login"
import Register from "./modules/userModules/register/Register"
// import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
// import Profile from "./modules/userModules/profile/Profile";
// import Orders from "./modules/userModules/admin/adminDashboard/AdminOrders";
// import Admin from "./modules/userModules/admin/adminDashboard/AdminLayout";


// import Footer from "./components/footer/Footer";

import { translations } from "./i18n/translations";
import './App.css'


export default function App() {
  const [lang, setLang] = useState("en");
  const t = translations[lang];

  return (
    <>
      <Header lang={lang} setLang={setLang} t={t} />
      <Routes>
        <Route path="/" element={<Home t={t.hero} />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login lang={lang} />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}
        {/* <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} /> */}
        {/* <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} /> */}
      </Routes>
      {/* <Footer /> */}
    </>
  );
}