const express = require('express')
const morgan = require('morgan')
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares')
const connectDB = require('../config/db')
const userRoutes = require('./routes/usersRoutes')
const postRoutes = require('./routes/postRoutes')
const uploadRoute = require('./routes/uploadRoute')

require('dotenv').config()

connectDB()

const app =  express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/upload', uploadRoute)

app.use('/uploads', express.static('/uploads'))

if (process.env.NODE_ENV === 'production') {
    app.use('/frontend/build')
    app.get('*', (req, res) => res.sendFile('/fronted/build/index.html'))
} else {
    app.get('/', (req, res) => {
        res.send('API Server is running...')
    })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))