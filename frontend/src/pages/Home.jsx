import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../Home.css";
import React from "react";

function Home() {
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
      navigate("/user-home");
    }
  })

  return (
    <div className="home">
      <div className="home-content">
        <h1>📖✨ <span>Welcome to</span> <span className="brand">Books Directory</span></h1>
        <p>📚 Organize. 📌 Track. ✅ Conquer your reading goals!</p>

        <div className="button-group">
          <Link to="/register" className="btn primary">
            🚀 Get Started
          </Link>
          <Link to="/login" className="btn secondary">
            🔐 Login
          </Link>
        </div>

        <footer>
          <p>Made with ❤️ for book lovers</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
