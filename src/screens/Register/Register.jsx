import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import "./Register.scss";
import Context from "../../contexts/context";
import MessageBanner from "../../components/MessageBanner/MessageBanner";
import Textinput from "../../components/Fields/Textinput";
import Numberinput from "../../components/Fields/Numberinput";

const Register = () => {
  const {
    registerState: { getregister, register },
  } = useContext(Context);

  const { theme } = useTheme();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [formData, setFormData] = useState({
    company_name: "",
    company_email: "",
    company_phone: "",
    company_address: "",
    company_type: "",
    company_type_other: "",
    company_gst_number: "",
    company_pan_number: "",
    admin_full_name: "",
    admin_email: "",
    admin_username: "",
    company_password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorMessage("");

    const response = await getregister(formData);
    console.log(response, "response");

    if (response?.status === 201) {
      setMessage(response?.data?.message || "Company registered successfully");
      setMessageType("success");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else if (response?.status === 400) {
      setErrorMessage(
        response?.response?.data?.detail ||
          "Registration failed. Please try again."
      );
      setMessageType("error");
    }
  };

  return (
    <div className="register">
      <MessageBanner message={message || errorMessage} type={messageType} />
      <div className="register__container">
        <div className="register__left">
          <div className="register__brand">
            <div className="register__logo">M</div>
            <h1 className="register__brand-name">ManaHRMS</h1>
          </div>
          <h2 className="register__title">Join Us Today!</h2>
          <p className="register__subtitle">
            Create your account to get started with HRMS
          </p>
        </div>

        <div className="register__right">
          <form className="register__form" onSubmit={handleSubmit}>
            <h2 className="register__form-title">Sign Up</h2>

            <h3 className="register__section-title">Company Information</h3>

            <div className="register__field">
              <Textinput
                label="Company Name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="Enter company name"
                required
              />
            </div>

            <div className="register__field">
              <Textinput
                label="Company Email"
                name="company_email"
                type="email"
                value={formData.company_email}
                onChange={handleChange}
                placeholder="Enter company email"
                required
              />
            </div>

            <div className="register__field">
              <Numberinput
                label="Company Phone"
                name="company_phone"
                value={formData.company_phone}
                onChange={handleChange}
                placeholder="Enter company phone"
                required
              />
            </div>

            <div className="register__field">
              <label htmlFor="company_address" className="register__label">
                Company Address
              </label>
              <textarea
                id="company_address"
                name="company_address"
                className="register__input"
                placeholder="Enter company address"
                value={formData.company_address}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>

            <div className="register__field">
              <label htmlFor="company_type" className="register__label">
                Company Type
              </label>
              <select
                id="company_type"
                name="company_type"
                className="register__input"
                value={formData.company_type}
                onChange={handleChange}
                required
              >
                <option value="">Select company type</option>
                <option value="Private Limited">Private Limited</option>
                <option value="Public Limited">Public Limited</option>
                <option value="Partnership">Partnership</option>
                <option value="Sole Proprietorship">Sole Proprietorship</option>
                <option value="LLP">LLP</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {formData.company_type === "Other" && (
              <div className="register__field">
                <Textinput
                  label="Specify Company Type"
                  name="company_type_other"
                  value={formData.company_type_other}
                  onChange={handleChange}
                  placeholder="Enter company type"
                  required
                />
              </div>
            )}

            <div className="register__field">
              <Textinput
                label="GST Number"
                name="company_gst_number"
                value={formData.company_gst_number}
                onChange={handleChange}
                placeholder="Enter GST number"
              />
            </div>

            <div className="register__field">
              <Textinput
                label="PAN Number"
                name="company_pan_number"
                value={formData.company_pan_number}
                onChange={handleChange}
                placeholder="Enter PAN number"
              />
            </div>

            <h3 className="register__section-title">Admin Information</h3>

            <div className="register__field">
              <Textinput
                label="Admin Full Name"
                name="admin_full_name"
                value={formData.admin_full_name}
                onChange={handleChange}
                placeholder="Enter admin full name"
                required
              />
            </div>

            <div className="register__field">
              <Textinput
                label="Admin Email"
                name="admin_email"
                type="email"
                value={formData.admin_email}
                onChange={handleChange}
                placeholder="Enter admin email"
                required
              />
            </div>

            <div className="register__field">
              <Textinput
                label="Admin Username"
                name="admin_username"
                value={formData.admin_username}
                onChange={handleChange}
                placeholder="Enter admin username"
                required
              />
            </div>

            <div className="register__field">
              <Textinput
                label="Password"
                name="company_password"
                type="password"
                value={formData.company_password}
                onChange={handleChange}
                placeholder="Create a password"
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
