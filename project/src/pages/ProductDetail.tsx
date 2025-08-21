import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockProducts } from '../mockData';
import { ArrowLeft, Heart, Share2, MapPin, Clock, Shield, MessageCircle, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = mockProducts.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>Product not found</h2>
          <p className="text-muted">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="btn btn-primary">
            <ArrowLeft size={16} className="me-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const getConditionClass = (condition: string) => {
    switch (condition) {
      case 'New': return 'text-success';
      case 'Like New': return 'text-info';
      case 'Used': return 'text-warning';
      default: return 'text-secondary';
    }
  };

  const getBadgeClass = (badge?: string) => {
    switch (badge) {
      case 'New': return 'bg-success';
      case 'Discount': return 'bg-warning';
      case 'Popular': return 'bg-primary';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="product-detail-page py-5">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/products" className="text-decoration-none">Products</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Back Button */}
        <div className="mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="btn btn-outline-secondary"
          >
            <ArrowLeft size={16} className="me-2" />
            Back to Products
          </button>
        </div>

        {/* Product Details */}
        <div className="row g-5">
          {/* Product Image */}
          <div className="col-lg-6">
            <div className="position-relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="img-fluid rounded shadow-lg w-100"
                style={{ height: '500px', objectFit: 'cover' }}
              />
              {product.badge && (
                <span className={`position-absolute top-0 start-0 badge ${getBadgeClass(product.badge)} m-3 fs-6`}>
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="col-lg-6">
            <div className="product-info">
              {/* Title and Actions */}
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h1 className="display-6 fw-bold mb-0">{product.name}</h1>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-secondary btn-sm">
                    <Heart size={16} />
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

              {/* Price and Condition */}
              <div className="d-flex align-items-center gap-3 mb-4">
                <span className="display-5 fw-bold text-primary">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className={`badge ${getConditionClass(product.condition)} fs-6 bg-opacity-10 border`}>
                  {product.condition}
                </span>
              </div>

              {/* Category and Seller */}
              <div className="row mb-4">
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <strong className="me-2">Category:</strong>
                    <span className="badge bg-light text-dark">{product.category}</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <strong className="me-2">Seller:</strong>
                    <span>{product.seller}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <h5 className="fw-bold mb-3">Description</h5>
                <p className="text-muted lh-lg">{product.description}</p>
              </div>

              {/* Features */}
              <div className="row mb-4">
                <div className="col-12">
                  <h6 className="fw-bold mb-3">Why Choose This Item?</h6>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="d-flex align-items-center">
                        <Shield size={16} className="text-success me-2" />
                        <small>Quality Guaranteed</small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center">
                        <Clock size={16} className="text-info me-2" />
                        <small>Quick Delivery</small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center">
                        <MapPin size={16} className="text-warning me-2" />
                        <small>Local Pickup Available</small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center">
                        <MessageCircle size={16} className="text-primary me-2" />
                        <small>Direct Communication</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-grid gap-2 d-md-flex">
                <button className="btn btn-primary btn-lg px-4 me-md-2">
                  Contact Seller
                </button>
                <button className="btn btn-success btn-lg px-4 me-md-2">
                  Buy Now
                </button>
                <button
                  className="btn btn-warning btn-lg px-4 d-flex align-items-center gap-2"
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    })
                  }
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>

              {/* Additional Info */}
              <div className="alert alert-info mt-4">
                <div className="d-flex align-items-center">
                  <Shield size={20} className="me-2" />
                  <div>
                    <strong>Buyer Protection</strong>
                    <small className="d-block text-muted">
                      Secure payment and return policy available
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="row mt-5 pt-5 border-top">
          <div className="col-12">
            <h3 className="fw-bold mb-4">Related Products</h3>
            <div className="row g-4">
              {mockProducts
                .filter(p => p.category === product.category && p.id !== product.id)
                .slice(0, 4)
                .map(relatedProduct => (
                  <div key={relatedProduct.id} className="col-lg-3 col-md-6">
                    <div className="card h-100 shadow-sm border-0">
                      <img 
                        src={relatedProduct.image} 
                        className="card-img-top" 
                        alt={relatedProduct.name}
                        style={{ height: '150px', objectFit: 'cover' }}
                      />
                      <div className="card-body">
                        <h6 className="card-title">{relatedProduct.name}</h6>
                        <p className="text-primary fw-bold">
                          ₹{relatedProduct.price.toLocaleString('en-IN')}
                        </p>
                        <Link 
                          to={`/products/${relatedProduct.id}`} 
                          className="btn btn-sm btn-outline-primary"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
