import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import './Register.scss';

const Register = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle registration
    // For now, just navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__left">
          <div className="register__brand">
            <div className="register__logo">M</div>
            <h1 className="register__brand-name">ManaHRMS</h1>
          </div>
          <h2 className="register__title">Join Us Today!</h2>
          <p className="register__subtitle">Create your account to get started with HRMS</p>
        </div>

        <div className="register__right">
          <form className="register__form" onSubmit={handleSubmit}>
            <h2 className="register__form-title">Sign Up</h2>

            <div className="register__field">
              <label htmlFor="name" className="register__label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="register__input"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register__field">
              <label htmlFor="email" className="register__label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="register__input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register__field">
              <label htmlFor="password" className="register__label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="register__input"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register__field">
              <label htmlFor="confirmPassword" className="register__label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="register__input"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register__options">
              <label className="register__checkbox">
                <input type="checkbox" required />
                <span>I agree to the Terms & Conditions</span>
              </label>
            </div>

            <button
              type="submit"
              className="register__button"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Sign Up
            </button>

            <p className="register__login">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

