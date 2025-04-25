import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../UserHome.css";

function UserHome() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userParsed = localStorage.getItem("user");
  
    if (!token) {
      navigate("/login");
      return;
    }
  
    try {
      const userData = JSON.parse(userParsed);
      setUser(userData);
    } catch (e) {
      console.error("Failed to parse user JSON:", e);
      localStorage.removeItem("user"); // Clean up corrupted data
      setUser(null); // Set a default value
    }
  }, [navigate]);


  return (
    <div className="user-home-container">
      <div className="welcome-card">
          <h1>📖 Welcome Back, <span className="highlight">{user.username}</span>!</h1>        <p className="subtitle">
          Your magical library awaits. Start exploring, adding, and organizing your 📚 collection now!
        </p>

        <div className="actions">
          <button className="btn-primary" onClick={()=>navigate("/add-book")}>✚ Add New Book</button>
          <button className="btn-secondary" onClick={() => navigate("/view-books")}>📚 View My Books</button>
          <button
            className="btn-logout"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/");
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
