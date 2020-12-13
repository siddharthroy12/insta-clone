const path = require('path')
const express = require('express')
const morgan = require('morgan')
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares')
const connectDB = require('../config/db')
const userRoutes = require('./routes/usersRoutes')
const postRoutes = require('./routes/postRoutes')
const uploadRoute = require('./routes/uploadRoute')
var fs = require('fs');

// Create uploads dir if doesn't exist
var dir = './uploads';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// Load environment variables from .env
require('dotenv').config()

// Connect to database
connectDB()

const app =  express()

// Use loggin in development mode
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/upload', uploadRoute)

app.use('/uploads', express.static('uploads'))

// Serve build in production mode
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'))
    app.get('*', (req, res) => 
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API Server is running...')
    })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))