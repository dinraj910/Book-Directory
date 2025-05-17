import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Form.css";

function Register() {

  useEffect(()=>{
      const token = localStorage.getItem("token");
      if(token){
        navigate("/user-home");
      }
    })

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://book-directory-backend-d7qo.onrender.com/api/users/register", formData);
      setMessage("🎉 Registration Successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("⚠️ User already registered or error occurred.");
      console.error(error);
    }
  };

  return (
    <div className="form-wrapper">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>📝 Register</h2>
        {message && <div className="alert">{message}</div>}
        <input name="username" placeholder="👤 Username" onChange={handleChange} required />
        <input name="email" type="email" placeholder="📧 Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="🔒 Password" onChange={handleChange} required />
        <button type="submit">🚀 Register</button>
        <p className="switch-link">
          Already have an account? <Link to="/login">🔐 Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
