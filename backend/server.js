const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const studentRouter = require('./routes/student')
const alumniRouter = require('./routes/alumni')
// const searchRouter = require('./routes/search')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri)

const connection = mongoose.connection
connection.once('open', () => {
  console.log('Mongoose DB connection established successfully')
})

app.use('/student', studentRouter)
app.use('/alumni', alumniRouter)
// app.use('/search', searchRouter)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
