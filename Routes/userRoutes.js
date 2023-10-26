const express = require('express')
const router = express.Router()
const User = require('../models/User')

//create user
router.post('/create-user', async(req,res)=> {
    const {name, email} = req.body;
    try{
        const newUser = new User({name, email})
        await newUser.save();
        res.status(201).json(newUser)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message: 'Error creating new user'})
    }
})

//like a song
router.post('/like-song', async(req,res)=> {
    const {userId, songId} = req.body
    try{
        const user = await User.findById(userId)
        if(!user){
            return res.status(500).json({message: 'User not found'})
        }

        if(!user.likedSongs.includes(songId)){
            user.likedSongs.push(songId)
            await user.save()
        }
        res.status(200).json({message: 'Liked song successfully'})
    }
    catch(error){
        return res.status(500).json({message: 'Song cannot be liked'})
    }
})

module.exports = router

