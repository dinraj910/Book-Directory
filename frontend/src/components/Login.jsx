import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../Form.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Login() {

  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/user-home");
    }
  })

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", formData);
      
      const { token, user } = res.data;
  
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
  
  
      setMessage("✅ Login successful!");
  
      toast.success("🎉 Login successful!");
  
      setTimeout(() => navigate("/user-home"), 1500);
    } catch (error) {
      setMessage("❌ Invalid email or password.");
      console.error(error);
    }
  };

  return (
    <div className="form-wrapper">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>🔐 Login</h2>
        {message && <div className="alert">{message}</div>}
        <input name="email" type="email" placeholder="📧 Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="🔑 Password" onChange={handleChange} required />
        <button type="submit">👉 Login</button>
        <p className="switch-link">
          Don’t have an account? <Link to="/register">📝 Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
