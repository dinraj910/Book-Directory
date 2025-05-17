// controllers/bookController.js

const Book = require("../models/Book");



exports.addBook = async(req,res)=>{
    const {title,author,genre,year,summary,isRead} = req.body;

    try{
        const newBook = new Book({userId: req.user.id,title,author,genre,year,summary,isRead,imageUrl: req.file ? `/uploads/${req.file.filename}` : null,createdAt: new Date()});
        await newBook.save();
        res.status(201).json({message: "Book added successfully"},newBook);
    }catch(error){
        res.status(500).json({message: "Server error"},error);
    }
};

exports.getAllBooks = async(req,res)=>{
    try{
        const books = await Book.find().populate('userId', 'name email');
        res.json(books); 
    }catch(error){
        res.status(500).json({ message: 'Failed to fetch books', error: err.message });

    }
};

// @desc Get books by logged-in user
exports.getUserBooks = async (req, res) => {
    try {
      const books = await Book.find({ userId: req.user.id });
      res.json(books);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching user books', error: err.message });
    }
};
  
// @desc Update a book
exports.updateBook = async (req, res) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(book);
    } catch (err) {
      res.status(500).json({ message: 'Error updating book', error: err.message });
    }
};
  
  // @desc Delete a book
exports.deleteBook = async (req, res) => {
    try {
      await Book.findByIdAndDelete(req.params.id);
      res.json({ message: 'Book deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting book', error: err.message });
    }
};