import React from 'react';
import { Link } from 'react-router-dom';
import { mockProducts, categories } from '../mockData';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { ArrowRight, ShoppingBag, Users, Shield, Recycle } from 'lucide-react';

const Home: React.FC = () => {
  const featuredProducts = mockProducts.slice(0, 4);
  const popularCategories = categories.slice(0, 6);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section py-5 mb-5" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '500px'
      }}>
        <div className="container h-100">
          <div className="row h-100 align-items-center text-white">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Buy & Sell <span className="text-warning">Pre-loved</span> Items
              </h1>
              <p className="lead mb-4">
                Discover amazing deals on quality second-hand products. 
                From electronics to fashion, find everything you need 
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/products" className="btn btn-warning btn-lg px-4">
                  <ShoppingBag size={20} className="me-2" />
                  Explore Now
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <img 
                src="https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Shopping" 
                className="img-fluid rounded-3 shadow-lg"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      

      {/* Categories Section */}
      <section className="categories-section py-5 mb-5 bg-light">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h2 className="display-6 fw-bold mb-3">Popular Categories</h2>
              <p className="lead text-muted">Browse through our most popular product categories</p>
            </div>
          </div>
          <div className="row g-4">
            {popularCategories.map((category) => (
              <div key={category.id} className="col-lg-2 col-md-4 col-sm-6">
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products-section py-5 mb-5">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h2 className="display-6 fw-bold mb-3">Trending Products</h2>
              <p className="lead text-muted">Check out our most popular items this week</p>
            </div>
          </div>
          <div className="row g-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="col-lg-3 col-md-6">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/products" className="btn btn-primary btn-lg px-5">
              View All Products
              <ArrowRight size={20} className="ms-2" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;