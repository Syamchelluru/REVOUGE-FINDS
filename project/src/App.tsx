import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Orders from "./pages/Orders";
import SavedAddressPage from "./pages/SavedAddress"; // ✅ updated
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentPage from "./pages/PaymentPage";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Placeholder for future payment integrations
const PaymentPlaceholder: React.FC<{ method: string }> = ({ method }) => (
  <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div className="bg-white p-5 rounded shadow text-center">
      <h2 className="mb-3">Payment: {method}</h2>
      <p className="mb-2">This is a placeholder page for {method} payment.</p>
      <p className="text-muted">Integration will come later.</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-grow-1" style={{ paddingTop: "70px" }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cart" element={<Cart />} />
                
                {/* Updated saved address page */}
                <Route path="/saved-address" element={<SavedAddressPage />} />

                {/* Checkout */}
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/payment" element={<PaymentPage />} />

                {/* Placeholder payment routes */}
                <Route path="/payment/googlepay" element={<PaymentPlaceholder method="Google Pay" />} />
                <Route path="/payment/phonepe" element={<PaymentPlaceholder method="PhonePe" />} />
                <Route path="/payment/paytm" element={<PaymentPlaceholder method="Paytm" />} />
                <Route path="/payment/card" element={<PaymentPlaceholder method="Card" />} />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
