import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import UserHome from "./components/UserHome";
import AddBook from "./components/AddBook";
import ViewBooks from "./components/ViewBooks";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Router>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> {/* <-- this is needed */}
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/view-books" element={<ViewBooks />} />
      </Routes>
    </Router>
  );
}

export default App;
