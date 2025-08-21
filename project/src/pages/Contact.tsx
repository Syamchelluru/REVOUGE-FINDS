import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Contact form submission:', formData);
      alert('Thank you for your message! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="contact-page py-5">
      <div className="container">
        {/* Header */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bold mb-4">Contact Us</h1>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
              Have questions or need help? We're here for you. 
              Reach out to us through any of the methods below.
            </p>
          </div>
        </div>

        <div className="row g-5">
          {/* Contact Information */}
          <div className="col-lg-4">
            <div className="contact-info">
              <h3 className="fw-bold mb-4">Get in Touch</h3>
              <p className="text-muted mb-4">
                We'd love to hear from you. Choose the most convenient way to contact us.
              </p>

              {/* Contact Methods */}
              <div className="contact-methods">
                <div className="contact-method d-flex align-items-start mb-4">
                  <div className="contact-icon bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
                       style={{ width: '50px', height: '50px', minWidth: '50px' }}>
                    <Mail size={20} className="text-primary" />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Email Us</h6>
                    <p className="text-muted mb-1">info@thriftstore.com</p>
                    <small className="text-muted">We typically respond within 24 hours</small>
                  </div>
                </div>

                <div className="contact-method d-flex align-items-start mb-4">
                  <div className="contact-icon bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
                       style={{ width: '50px', height: '50px', minWidth: '50px' }}>
                    <Phone size={20} className="text-success" />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Call Us</h6>
                    <p className="text-muted mb-1">+1 (555) 123-4567</p>
                    <small className="text-muted">Mon-Fri, 9AM-6PM EST</small>
                  </div>
                </div>

                <div className="contact-method d-flex align-items-start mb-4">
                  <div className="contact-icon bg-warning bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
                       style={{ width: '50px', height: '50px', minWidth: '50px' }}>
                    <MapPin size={20} className="text-warning" />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Visit Us</h6>
                    <p className="text-muted mb-1">123 Thrift Street</p>
                    <p className="text-muted mb-1">City, State 12345</p>
                    <small className="text-muted">United States</small>
                  </div>
                </div>

                <div className="contact-method d-flex align-items-start">
                  <div className="contact-icon bg-info bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
                       style={{ width: '50px', height: '50px', minWidth: '50px' }}>
                    <Clock size={20} className="text-info" />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Business Hours</h6>
                    <p className="text-muted mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-muted mb-1">Saturday: 10:00 AM - 4:00 PM</p>
                    <small className="text-muted">Sunday: Closed</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-5">
                <div className="d-flex align-items-center mb-4">
                  <MessageCircle size={24} className="text-primary me-2" />
                  <h4 className="fw-bold mb-0">Send us a Message</h4>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label fw-semibold">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label fw-semibold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label fw-semibold">
                      Subject
                    </label>
                    <select
                      className="form-select"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="feedback">Feedback & Suggestions</option>
                      <option value="report">Report an Issue</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className="form-label fw-semibold">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg px-4"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="me-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="row mt-5 pt-5 border-top">
          <div className="col-12">
            <h3 className="fw-bold text-center mb-5">Frequently Asked Questions</h3>
            <div className="row">
              <div className="col-lg-6 mb-4">
                <div className="faq-item">
                  <h6 className="fw-bold mb-2">How do I create an account?</h6>
                  <p className="text-muted small">
                    Click on "Register" in the top navigation, fill out the form with your details, 
                    and you'll be ready to start buying and selling in minutes.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="faq-item">
                  <h6 className="fw-bold mb-2">Is it safe to buy and sell here?</h6>
                  <p className="text-muted small">
                    Yes! We have robust security measures, buyer protection policies, 
                    and a trusted community of verified users.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="faq-item">
                  <h6 className="fw-bold mb-2">What items can I sell?</h6>
                  <p className="text-muted small">
                    You can sell almost anything in good condition - electronics, fashion, 
                    furniture, books, and more. Check our guidelines for prohibited items.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="faq-item">
                  <h6 className="fw-bold mb-2">How do payments work?</h6>
                  <p className="text-muted small">
                    We support secure payment methods including credit cards, PayPal, 
                    and bank transfers. All transactions are protected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;