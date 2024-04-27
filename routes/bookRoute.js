const express = require('express')
const {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController')

const router = express.Router()

// route for get all books
router.get('/', getAllBooks)

// route for get a book
router.get('/:id', getBook)

// route for create a book
router.post('/create', createBook)

// route for update a book
router.put('/:id/update', updateBook)

// route for delete a book
router.delete('/:id/delete', deleteBook)

module.exports = router
