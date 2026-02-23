import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import { AuthProvider } from "./context/AuthContext";
import { BookingModalProvider } from "./hooks/useNewBookingModal";
import NewBookingModal from "./components/user/NewBookingModal/NewBookingModal";

import ScrollUp from "./components/user/ScrollUp/ScrollUp";
import Home from "./pages/user/Home/Home";
import Contact from "./pages/user/Contact/Contact";
import Services from "./pages/user/Services/Services";
import Products from "./pages/user/Products/Products";
import ProductDetail from "./pages/user/ProductDetail/ProductDetail";
import Explore from "./pages/user/Explore/Explore";
import Comparison from "./pages/user/Comparison/Comparison";
import Reviews from "./pages/user/Reviews/Reviews";
import BrandPPF from "./pages/user/BrandPPF/BrandPPF";
import BrandCeramic from "./pages/user/BrandCeramic/BrandCeramic";
import Profile from "./pages/user/Profile/Profile";
import UserAuth from "./pages/user/Auth/Auth";
import AdminAuth from "./pages/admin/Auth/Auth";
import AdminDashboard from "./pages/admin/Dashboard/Dashboard";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <BookingModalProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/comparison" element={<Comparison />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/brands/ppf/:brandId" element={<BrandPPF />} />
              <Route path="/brands/ceramic/:brandId" element={<BrandCeramic />} />
              <Route path="/login" element={<UserAuth />} />
              <Route path="/register" element={<UserAuth />} />
              <Route path="/admin/login" element={<AdminAuth />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
            <ScrollUp />
            <NewBookingModal />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </Router>
        </BookingModalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
