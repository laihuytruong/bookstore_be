const express = require('express')
const { PORT, mongoDBURL } = require('./config')
const mongoose = require('mongoose')
const bookRoute = require('./routes/bookRoute')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Middleware for passing request body
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-type'],
  })
)

app.use('/books', bookRoute)

app.get('/', (req, res) => {
  res.send('Welcome to bookstore!')
})

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('Connected to database')

    app.listen(PORT, () => {
      console.log(`App is listening on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
