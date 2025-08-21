import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    getCartTotal,
  } = useCart();

  const formatINR = (amount: number) =>
    amount.toLocaleString("en-IN", { style: "currency", currency: "INR" });

  return (
    <div className="cart-container my-5">
      <h2 className="cart-title mb-4">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div className="cart-empty text-center">
          <h5>Your cart is empty</h5>
          <Link to="/products" className="btn btn-primary mt-3">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="table-responsive d-none d-md-block">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td className="d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-img"
                      />
                      <span>{item.name}</span>
                    </td>
                    <td>{formatINR(item.price)}</td>
                    <td>
                      <div className="cart-qty">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          ➖
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          ➕
                        </button>
                      </div>
                    </td>
                    <td>{formatINR(item.price * item.quantity)}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="d-md-none">
            {cart.map((item) => (
              <div className="cart-card mb-3" key={item.id}>
                <div className="cart-card-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-card-content">
                  <h5>{item.name}</h5>
                  <p>Price: {formatINR(item.price)}</p>
                  <div className="cart-qty">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      ➖
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      ➕
                    </button>
                  </div>
                  <p>Total: {formatINR(item.price * item.quantity)}</p>
                  <button
                    className="btn btn-danger btn-sm w-100"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary mt-4 d-flex flex-column flex-md-row justify-content-between align-items-center">
            <button className="btn btn-outline-danger mb-3 mb-md-0" onClick={clearCart}>
              Clear Cart
            </button>
            <h4>Total: {formatINR(getCartTotal())}</h4>
            <Link to="/checkout" className="btn btn-success mt-3 mt-md-0">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
