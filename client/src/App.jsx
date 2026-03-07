import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { BookingModalProvider } from "./hooks/useNewBookingModal";
import Cart from "./pages/user/Cart/Cart";
import Checkout from "./pages/user/Checkout/Checkout";
import OrderConfirmation from "./pages/user/OrderConfirmation/OrderConfirmation";
import ScrollUp from "./components/user/ScrollUp/ScrollUp";
import Home from "./pages/user/Home/Home";
import Contact from "./pages/user/Contact/Contact";
import Services from "./pages/user/Services/Services";
import Products from "./pages/user/Products/Products";
import ProductDetail from "./pages/user/ProductDetail/ProductDetail";
import Comparison from "./pages/user/Comparison/Comparison";
import UserAuth from "./pages/user/Auth/Auth";
import AdminAuth from "./pages/admin/Auth/Auth";
import AdminDashboard from "./pages/admin/Dashboard/Dashboard";
import AdminProducts from "./pages/admin/Products/Products";
import AdminServices from "./pages/admin/Services/Services";
import AdminBookings from "./pages/admin/Bookings/Bookings";
import AdminOrders from "./pages/admin/Orders/Orders";
import AdminContacts from "./pages/admin/Contacts/Contacts";
import AdminTimeSlots from "./pages/admin/TimeSlots/TimeSlots";
import MyOrders from "./pages/user/MyOrders/MyOrders";
import Profile from "./pages/user/Profile/Profile";
import MyBookings from "./pages/user/MyBookings/MyBookings";
import BookingConfirmation from "./pages/user/BookingConfirmation/BookingConfirmation";
import NotFound from "./pages/user/NotFound/NotFound";
import ProtectedRoute from "./components/user/ProtectedRoute/ProtectedRoute";
import AdminProtectedRoute from "./components/admin/ProtectedRoute/AdminProtectedRoute";

const NewBookingModal = React.lazy(() => import("./components/user/NewBookingModal/NewBookingModal"));

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <CartProvider>
          <BookingModalProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/comparison" element={<Comparison />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order/confirmation/:orderId" element={<OrderConfirmation />} />
              <Route path="/login" element={<UserAuth />} />
              <Route path="/register" element={<UserAuth />} />
              <Route path="/booking/confirmation/:id" element={<BookingConfirmation />} />
              <Route path="/admin/auth" element={<AdminAuth />} />
              <Route path="/admin/login" element={<AdminAuth />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/my-bookings" element={<MyBookings />} />
              </Route>

              <Route element={<AdminProtectedRoute />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/services" element={<AdminServices />} />
                <Route path="/admin/bookings" element={<AdminBookings />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/contacts" element={<AdminContacts />} />
                <Route path="/admin/timeslots" element={<AdminTimeSlots />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ScrollUp />
            <React.Suspense fallback={null}>
              <NewBookingModal />
            </React.Suspense>
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
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
