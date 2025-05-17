import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../AddBook.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function AddBook() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        year: "",
        summary: "",
        isRead: false,
        imageUrl: "",
    });

    const [imageFile, setImageFile] = useState(null);   

    const handleChange = (e)=>{
        const {name,value,type,checked} = e.target;
        setFormData((prev)=>({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFileChange = (e)=>{
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const token = localStorage.getItem("token");

        const bookData = new FormData();
        bookData.append("title", formData.title);
        bookData.append("author", formData.author);
        bookData.append("genre", formData.genre);
        bookData.append("year", formData.year);
        bookData.append("summary", formData.summary);
        bookData.append("isRead", formData.isRead);

        if (imageFile) {
            bookData.append("image", imageFile); // image
        } else if (formData.imageUrl) {
            bookData.append("imageUrl", formData.imageUrl);
        }

        try{
            await axios.post("https://book-directory-backend-d7qo.onrender.com/api/books",bookData,{
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("✅ Book added successfully!");

            setTimeout(() => navigate("/user-home"), 1500);

        }catch(error){
            console.error(error);
            toast.error("❌ Error adding book.");
        }

    };

    return (
        <div className="add-book-container">
          <h2>➕ Add New Book</h2>
          <form onSubmit={handleSubmit} className="add-book-form">
            <input name="title" placeholder="📕 Title" value={formData.title} onChange={handleChange} required />
            <input name="author" placeholder="✍️ Author" value={formData.author} onChange={handleChange} required />
            <input name="genre" placeholder="📚 Genre" value={formData.genre} onChange={handleChange} />
            <input name="year" type="number" placeholder="📅 Year" value={formData.year} onChange={handleChange} />
            <textarea name="summary" placeholder="📝 Summary" value={formData.summary} onChange={handleChange} />
    
            <label>🖼️ Image Upload (or paste URL below):</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <input name="imageUrl" placeholder="Or enter image URL" value={formData.imageUrl} onChange={handleChange} />
    
            <label>
              <input type="checkbox" name="isRead" checked={formData.isRead} onChange={handleChange} />
              ✅ Mark as Read
            </label>
    
            <button type="submit">📚 Add Book</button>
          </form>
        </div>
    );
}

export default AddBook;