const mongoose = require('mongoose')
const MONGO_URI = 'mongodb+srv://cythakuria:maisgreat@cluster0.tyzy6lo.mongodb.net/Spotify?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI)
.then(()=> {
    console.log('MongoDB connected successfully')
})
.catch((error)=> {
    console.log('Connection not established'+error)
})
