// routes/bookRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const {
  addBook,
  getAllBooks,
  getUserBooks,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');

// Upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'backend/uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Routes
router.post('/', protect, upload.single('image'), addBook);
router.get('/', getAllBooks);
router.get('/user', protect, getUserBooks);
router.put('/:id', protect, updateBook);
router.delete('/:id', protect, deleteBook);

module.exports = router;
