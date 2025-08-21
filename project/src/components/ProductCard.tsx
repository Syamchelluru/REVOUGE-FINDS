// src/components/ProductCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../mockData';
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const getBadgeClass = (badge?: string) => {
    switch (badge) {
      case 'New': return 'bg-success';
      case 'Discount': return 'bg-warning';
      case 'Popular': return 'bg-primary';
      default: return 'bg-secondary';
    }
  };

  const getConditionClass = (condition: string) => {
    switch (condition) {
      case 'New': return 'text-success';
      case 'Like New': return 'text-info';
      case 'Used': return 'text-warning';
      default: return 'text-secondary';
    }
  };

  return (
    <div className="card h-100 shadow-sm border-0 product-card">
      <div className="position-relative overflow-hidden">
        <img 
          src={product.image} 
          className="card-img-top product-image" 
          alt={product.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        
        {product.badge && (
          <span className={`position-absolute top-0 start-0 badge ${getBadgeClass(product.badge)} m-2`}>
            {product.badge}
          </span>
        )}
        
        <div className="position-absolute top-0 end-0 m-2">
          <button className="btn btn-light btn-sm rounded-circle me-1 wishlist-btn">
            <Heart size={16} />
          </button>
        </div>
        
        <div className="product-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
          <Link 
            to={`/products/${product.id}`} 
            className="btn btn-primary btn-sm d-flex align-items-center me-2"
          >
            <Eye size={16} className="me-1" />
            View Details
          </Link>

          <button
            className="btn btn-success btn-sm d-flex align-items-center"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={16} className="me-1" />
            Add to Cart
          </button>
        </div>
      </div>
      
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h6 className="card-title fw-bold mb-0 text-truncate" style={{ maxWidth: '70%' }}>
            {product.name}
          </h6>
          <span className={`badge ${getConditionClass(product.condition)} bg-opacity-10 border`}>
            {product.condition}
          </span>
        </div>
        
        <p className="text-muted small mb-2">by {product.seller}</p>
        <p className="card-text small text-muted flex-grow-1" style={{ 
          display: '-webkit-box', 
          WebkitLineClamp: 2, 
          WebkitBoxOrient: 'vertical', 
          overflow: 'hidden' 
        }}>
          {product.description}
        </p>
        
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div>
            {/* ✅ INR formatted like ProductDetail */}
            <span className="h5 text-primary fw-bold mb-0">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <small className="text-muted d-block">{product.category}</small>
          </div>
          <Link 
            to={`/products/${product.id}`} 
            className="btn btn-outline-primary btn-sm"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
