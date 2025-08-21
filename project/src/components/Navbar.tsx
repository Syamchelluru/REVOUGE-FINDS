import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { cart } = useCart();
  const [cartCount, setCartCount] = useState(0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Update cart count dynamically
  useEffect(() => {
    if (isLoggedIn) {
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    } else {
      setCartCount(0);
    }
  }, [cart, isLoggedIn]);

  // Detect mobile view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle navbar search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4">
        <Link className="navbar-brand fw-bold" to="/">
          Revouge Finds
        </Link>

        {/* Desktop Search */}
        <form
          className="d-none d-md-flex mx-auto"
          style={{ width: "40%" }}
          onSubmit={handleSearchSubmit}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>

        <ul className="navbar-nav ms-auto align-items-center flex-row">
          {/* Mobile Search Toggle */}
          <li className="nav-item me-3 d-md-none">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              🔍
            </button>
          </li>

          {/* Cart */}
          <li className="nav-item me-3 position-relative">
            <Link className="nav-link" to="/cart">
              🛒 Cart
              {isLoggedIn && cartCount > 0 && (
                <span
                  className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: "0.75rem" }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
          </li>

          {/* Account */}
          {isLoggedIn ? (
            <li
              className="nav-item dropdown"
              onMouseEnter={() => !isMobile && setShowDropdown(true)}
              onMouseLeave={() => !isMobile && setShowDropdown(false)}
            >
              <span
                className="nav-link dropdown-toggle"
                role="button"
                style={{ cursor: "pointer" }}
                onClick={() => isMobile && setShowDropdown(!showDropdown)}
              >
                👤 Account
              </span>

              {showDropdown && (
                <ul className="dropdown-menu dropdown-menu-end show mt-2">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/orders">
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/saved-address">
                      Saved Address
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <li className="nav-item">
              <Link
                className="btn btn-outline-primary rounded-pill px-3"
                to="/login"
              >
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="mobile-search-bar bg-light p-2 shadow-sm d-md-none">
          <form className="d-flex" onSubmit={handleSearchSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Navbar;
