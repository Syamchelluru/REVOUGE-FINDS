// src/pages/Register.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerUser } from '../services/authService';

type FormState = {
  fullName: string;
  mobile: string;
  email: string;
  password: string;
};

type ErrorsState = {
  fullName?: string;
  mobile?: string;
  email?: string;
  password?: string;
  general?: string;
};

const Register: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<ErrorsState>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, general: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: ErrorsState = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!/^\d{10}$/.test(form.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }

    // Updated email validation to require @gmail.com (to match backend)
    if (!/^[\w-.]+@gmail\.com$/.test(form.email)) {
      newErrors.email = 'Email must be a valid @gmail.com address';
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(form.password)
    ) {
      newErrors.password =
        'Password must be 8+ chars and include uppercase, lowercase, number, special char';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;

    setIsLoading(true);
    try {
      // NOTE: registerUser calls backend /signup route
      await registerUser(form.fullName, form.email, form.mobile, form.password);
      setIsLoading(false);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err: any) {
      setIsLoading(false);
      let msg = 'Registration failed. Try again.';

      if (err.message) {
        msg = err.message;
      }

      if (err.errors && Array.isArray(err.errors)) {
        msg = err.errors.map((e: any) => e.msg).join(', ');
      }

      setErrors({ general: msg });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left register-bg">
        <h2>One of us?</h2>
        <p>Welcome to our family</p>
        <Link to="/login" className="btn btn-outline-light">Sign In</Link>
      </div>

      <div className="auth-right">
        <h2>Sign up</h2>

        {errors.general && (
          <div className="alert alert-danger" role="alert">
            {errors.general}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="text-danger small">{errors.fullName}</p>}

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <p className="text-danger small">{errors.mobile}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-danger small">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-danger small">{errors.password}</p>}

          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Sign Up'}
          </button>

          <p className="text-center mt-3">Or Sign up with social platforms</p>
          <div className="social-icons">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-google"></i>
            <i className="fab fa-linkedin-in"></i>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
