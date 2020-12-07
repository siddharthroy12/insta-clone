const express = require('express')
const morgan = require('morgan')
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares')
const connectDB = require('../config/db')
const userRoutes = require('./routes/usersRoutes')
const postRoutes = require('./routes/postRoutes')

require('dotenv').config()


connectDB()

const app =  express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))