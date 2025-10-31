import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import './Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle authentication
    // For now, just navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__left">
          <div className="login__brand">
            <div className="login__logo">M</div>
            <h1 className="login__brand-name">ManaHRMS</h1>
          </div>
          <h2 className="login__title">Welcome Back!</h2>
          <p className="login__subtitle">Sign in to continue to your HRMS dashboard</p>
        </div>

        <div className="login__right">
          <form className="login__form" onSubmit={handleSubmit}>
            <h2 className="login__form-title">Sign In</h2>

            <div className="login__field">
              <label htmlFor="email" className="login__label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="login__input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="login__field">
              <label htmlFor="password" className="login__label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="login__input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="login__options">
              <label className="login__checkbox">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="login__forgot">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="login__button"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Sign In
            </button>

            <p className="login__register">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

