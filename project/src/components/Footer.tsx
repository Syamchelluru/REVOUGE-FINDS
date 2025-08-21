// src/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ import AuthContext

const Footer: React.FC = () => {
  const { isLoggedIn } = useAuth(); // ✅ get login state

  return (
    <footer className="bg-light text-center text-lg-start border-top mt-5">
      <div className="container p-4">
        <div className="row">
          {/* About Section */}
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Revogue Finds</h5>
            <p>Your one-stop thrift marketplace.</p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled mb-0">
              <li><Link to="/" className="text-dark">Home</Link></li>
              <li><Link to="/about" className="text-dark">About</Link></li>
              <li><Link to="/contact" className="text-dark">Contact</Link></li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Support</h5>
            <ul className="list-unstyled">
              {/* ✅ Show login/register only if NOT logged in */}
              {!isLoggedIn && (
                <>
                  <li><Link to="/login" className="text-dark">Login</Link></li>
                  <li><Link to="/register" className="text-dark">Register</Link></li>
                </>
              )}
              <li><a href="#" className="text-dark">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3 bg-secondary text-white">
        © {new Date().getFullYear()} Revogue Finds All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
