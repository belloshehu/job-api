require('dotenv').config()
require('express-async-errors')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const authenticateUser = require('./middleware/auth')
const connectDB = require('./db/connect')

const express = require('express')
const app = express()
const authRouter = require('./routes/auth')
const jobRouter= require('./routes/jobs')

// set encoding middleware
app.use(express.json())
app.use(express.static('public'))

// connect router
app.get('/', (req, res)=>{
    res.send("<h2>Welcome to job API</h2>")
})
app.use('/api/auth', authRouter)
app.use('/api/jobs', authenticateUser, jobRouter)

// error middlewares
app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

const port = process.env.PORT || 8000
const start = async() =>{
    // connect database here
    await connectDB(process.env.MONGO_URI)
    try{
        app.listen(port, ()=>{
            console.log(`Server is listening on port ${port}`)
        })
    }catch(error){
        console.log(error)
    }
}

start()
