const express = require('express')
const PlayList = require('../models/Playlist')
const User = require('../models/User')
const Song = require('../models/Songs')
const router = express.Router()

//create a playlist
router.post('/playlist', async(req,res)=> {
    const {name, owner,songs} = req.body
    try{
        const newPlayList = new PlayList({name, owner, songs})
        await newPlayList.save()

        owner.playlists.push(newPlayList)
        await owner.save()
        res.status(201).json(newPlayList)
    }
    catch(error){
        res.status(500).json('Error creating playlist')
    }
})

//get playlist
router.get('/playlist', async(req,res)=> {
    try{
        const playlist = PlayList.find();
        res.status(200).json(playlist)
    }
    catch(error){
        return res.status(500).json({error: 'Cannot get playlist'})
    }
})

//add song to playlist
router.post('/users/:userId/playlists/:playlistId/add-song/:songId', async(req,res)=> {
    const {playlistId, songId} = req.body
    try{
        const {userId, playlistId, songId} = req.params
        const user = User.findById(userId)
        if(!user){
            res.status(404).json({message: 'User not found'})
        }

        const playlist = PlayList.findById(playlistId)
        if(!playlist){
            res.status(404).json({message: 'Playlist not found'})
        }

        const song = Song.findById(songId)
        if(!song){
            res.status(404).json({message: 'Song not found'})
        }

        playlist.songs.push(songId)
        await playlist.save()
        res.status(200).json({message: 'Song added to playlist'})
    }
    catch(error){
        res.status(500).json({ error: 'Error adding song to the playlist' });
    }
})

module.exports = router