import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import "./Login.scss";
import Context from "../../contexts/context";
import MessageBanner from "../../components/MessageBanner/MessageBanner";
import Textinput from "../../components/Fields/Textinput";

const Login = () => {
  const {
    loginState: { login },
  } = useContext(Context);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(formData.username, formData.password);
    console.log(response, "response");
    if (response?.status === 200) {
      setMessage(response?.data?.message || "Login successful");
      setMessageType("success");
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } else {
      setErrorMessage(
        response?.response?.data?.detail || "Login failed. Please try again."
      );
      setMessageType("error");
    }
  };

  return (
    <div className="login">
      <MessageBanner
        message={message}
        description={errorMessage}
        type={messageType}
      />
      <div className="login__container">
        <div className="login__left">
          <div className="login__brand">
            <div className="login__logo">M</div>
            <h1 className="login__brand-name">ManaHRMS</h1>
          </div>
          <h2 className="login__title">Welcome Back!</h2>
          <p className="login__subtitle">
            Sign in to continue to your HRMS dashboard
          </p>
        </div>

        <div className="login__right">
          <form className="login__form" onSubmit={handleSubmit}>
            <h2 className="login__form-title">Sign In</h2>

            <div className="login__field">
              <Textinput
                label="Username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
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
