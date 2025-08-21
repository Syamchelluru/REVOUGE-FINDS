import React from 'react';
import { Users, Target, Award, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="about-page py-5">
      <div className="container">
        {/* Hero Section */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bold mb-4">About ThriftStore</h1>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
              We're on a mission to create a sustainable future by connecting people 
              through the power of second-hand trading.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-6">
            <img 
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Our Mission" 
              className="img-fluid rounded shadow-lg"
            />
          </div>
          <div className="col-lg-6">
            <h2 className="fw-bold mb-4">Our Mission</h2>
            <p className="text-muted mb-4">
              At ThriftStore, we believe that every item deserves a second chance. 
              Our platform connects buyers and sellers to create a circular economy 
              where pre-loved items find new homes, reducing waste and promoting sustainability.
            </p>
            <p className="text-muted">
              We're committed to making second-hand shopping accessible, trustworthy, 
              and enjoyable for everyone while contributing to a more sustainable future.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="row mb-5">
          <div className="col-12 text-center mb-5">
            <h2 className="fw-bold">Our Values</h2>
            <p className="text-muted">The principles that guide everything we do</p>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="text-center">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                   style={{ width: '80px', height: '80px' }}>
                <Heart size={32} className="text-primary" />
              </div>
              <h5 className="fw-bold">Sustainability</h5>
              <p className="text-muted">
                Promoting environmental responsibility through reuse and recycling.
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="text-center">
              <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                   style={{ width: '80px', height: '80px' }}>
                <Users size={32} className="text-success" />
              </div>
              <h5 className="fw-bold">Community</h5>
              <p className="text-muted">
                Building connections between people who share our values.
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="text-center">
              <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                   style={{ width: '80px', height: '80px' }}>
                <Target size={32} className="text-warning" />
              </div>
              <h5 className="fw-bold">Quality</h5>
              <p className="text-muted">
                Ensuring every transaction meets our high standards for excellence.
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="text-center">
              <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                   style={{ width: '80px', height: '80px' }}>
                <Award size={32} className="text-info" />
              </div>
              <h5 className="fw-bold">Trust</h5>
              <p className="text-muted">
                Creating a safe and secure environment for all our users.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="row bg-primary text-white rounded p-5 mb-5">
          <div className="col-12 text-center mb-4">
            <h2 className="fw-bold">Our Impact</h2>
            <p className="mb-0">Making a difference, one transaction at a time</p>
          </div>
          <div className="col-lg-3 col-md-6 text-center mb-3">
            <h3 className="display-6 fw-bold">10K+</h3>
            <p className="mb-0">Happy Users</p>
          </div>
          <div className="col-lg-3 col-md-6 text-center mb-3">
            <h3 className="display-6 fw-bold">50K+</h3>
            <p className="mb-0">Items Sold</p>
          </div>
          <div className="col-lg-3 col-md-6 text-center mb-3">
            <h3 className="display-6 fw-bold">500+</h3>
            <p className="mb-0">Categories</p>
          </div>
          <div className="col-lg-3 col-md-6 text-center mb-3">
            <h3 className="display-6 fw-bold">95%</h3>
            <p className="mb-0">Satisfaction Rate</p>
          </div>
        </div>

        {/* Story Section */}
        <div className="row align-items-center">
          <div className="col-lg-6 order-lg-2">
            <img 
              src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Our Story" 
              className="img-fluid rounded shadow-lg"
            />
          </div>
          <div className="col-lg-6 order-lg-1">
            <h2 className="fw-bold mb-4">Our Story</h2>
            <p className="text-muted mb-4">
              Founded in 2024, ThriftStore began as a simple idea: to create a platform 
              where people could easily buy and sell pre-owned items. We noticed that 
              many perfectly good items were going to waste while others were looking 
              for affordable, quality products.
            </p>
            <p className="text-muted mb-4">
              What started as a small local initiative has grown into a thriving 
              community of environmentally-conscious individuals who believe in 
              the power of reuse and sustainability.
            </p>
            <p className="text-muted">
              Today, we continue to innovate and expand our platform to serve our 
              growing community better, always keeping our core values at the center 
              of everything we do.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;