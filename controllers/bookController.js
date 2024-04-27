const Book = require('../models/Book')

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({})
    res.status(200).json({
      count: books.length,
      data: books,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    res.status(200).json(book)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createBook = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).json({
        message: 'Send all required fields: title, author, publishYear',
      })
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    }
    const book = await Book.create(newBook)
    res.status(200).json(book)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateBook = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).json({
        message: 'Send all required fields: title, author, publishYear',
      })
    }
    const book = await Book.findByIdAndUpdate(req.params.id, req.body)
    if (!book) {
      console.log('2')
      return res.status(404).json({ message: 'Book not found' })
    }
    res.status(200).json({ message: 'Book is updated successfully!' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id, req.body)
    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }
    res.status(200).json({ message: 'Book is deleted successfully!' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
}
