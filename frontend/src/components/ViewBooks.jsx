import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../ViewBooks.css";

function ViewBooks() {
  const [books, setBooks] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const token = localStorage.getItem("token");

  const [editingBook, setEditingBook] = useState(null); // Holds book being edited
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    summary: "",
    isRead: false
  });


  const handleEdit = (book) => {
    
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      year: book.year,
      summary: book.summary,
      isRead: book.isRead
    });
  };
  

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/books/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch books");
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        toast.error("Error fetching books.");
        console.error(err);
      }
    };
    fetchBooks();
  }, [token]);

  const confirmDelete = (bookId) => {
    setBookToDelete(bookId);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/books/${bookToDelete}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setBooks(books.filter((b) => b._id !== bookToDelete));
        toast.success("Book deleted successfully.");
      } else {
        toast.error("Failed to delete the book.");
      }
    } catch (err) {
      toast.error("An error occurred while deleting.");
      console.error(err);
    } finally {
      setShowConfirm(false);
      setBookToDelete(null);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/books/${editingBook._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (res.ok) {
        const updatedBook = await res.json();
        setBooks(books.map((b) => (b._id === updatedBook._id ? updatedBook : b)));
        toast.success("Book updated successfully.");
        setEditingBook(null);
      } else {
        toast.error("Failed to update the book.");
      }
    } catch (err) {
      toast.error("Error while updating.");
      console.error(err);
    }
  };
  

  return (
    <div className="view-books-container">
      <ToastContainer position="top-center" autoClose={3000} />
      <h2>📚 My Book Collection</h2>

      <div className="books-grid">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="book-card">
              <div className="image-wrapper">
                <img
                  src={
                    book.imageUrl
                      ? `http://localhost:5000${book.imageUrl}`
                      : "/default-book.png"
                  }
                  alt={book.title}
                  className="book-image"
                  onError={(e) => (e.target.src = "/default-book.png")}
                />
              </div>

              <div className="book-details">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">👨‍💻 {book.author}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
                <p><strong>Year:</strong> {book.year}</p>
                <p className="book-summary">{book.summary}</p>
                <p><strong>Status:</strong> {book.isRead ? "✅ Read" : "📖 Unread"}</p>

                <div className="card-actions">
                  <button className="edit-btn" onClick={() => handleEdit(book)}>✏️ Edit</button>
                  <button className="delete-btn" onClick={() => confirmDelete(book._id)}>🗑️ Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>

      {/* MODAL */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Are you sure?</h3>
            <p>Do you really want to delete this book? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="confirm-btn" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL */}
      {editingBook && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Book</h3>
            <form onSubmit={handleEditSubmit} className="edit-form">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                required
              />
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author"
                required
              />
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                placeholder="Genre"
                required
              />
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="Year"
                required
              />
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Summary"
              />
              <label>
                <input
                  type="checkbox"
                  name="isRead"
                  checked={formData.isRead}
                  onChange={handleChange}
                />{" "}
                Mark as Read
              </label>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setEditingBook(null)}>Cancel</button>
                <button type="submit" className="confirm-btn">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>
  );
}

export default ViewBooks;
