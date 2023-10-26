const express = require('express')
const db = require('./db/db')
//routes
const songRoutes = require('./Routes/songRoutes')
const playlistRoutes = require('./Routes/playlistRoutes')
const userRoutes = require('./Routes/userRoutes')

const port = 5000;
const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/song', songRoutes)
app.use('/playlist', playlistRoutes)
app.use('/users', userRoutes)

app.listen(port, ()=> {
    console.log(`Server running at port ${port}`)
})