import React from 'react';
import { Category } from '../mockData';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className="card border-0 shadow-sm category-card h-100">
      <div className="position-relative overflow-hidden">
        <img 
          src={category.image} 
          className="card-img-top category-image" 
          alt={category.name}
          style={{ height: '150px', objectFit: 'cover' }}
        />
        <div className="category-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
          <div className="text-center text-white">
            <h5 className="fw-bold mb-1">{category.name}</h5>
            <small>{category.count} items</small>
          </div>
        </div>
      </div>
      <div className="card-body text-center py-3">
        <h6 className="card-title fw-bold mb-1">{category.name}</h6>
        <p className="text-muted small mb-0">{category.count} items available</p>
      </div>
    </div>
  );
};

export default CategoryCard;