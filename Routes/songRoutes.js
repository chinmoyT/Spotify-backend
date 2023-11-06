const express = require('express')
const router = express.Router()
const Song = require('../models/Songs')

//get all songs
router.get('/', async(req,res)=> {
    let songs
    try{
        songs = await Song.find();
        res.status(200).json(songs)
    }
    catch(error){
        res.status(500).json({error: 'Error getting songs'})
    }
})

//get songs with id
router.get('/:id', async(req,res)=> {
    const id = req.params.id;
    let song
    try{
        song = await Song.findById(id)
    }
    catch(error){
        return console.log(error)
    }
    if(!song){
        return res.status(404).json({message: 'Invalid id'})
    }
    return res.status(200).json({song})
});

//add new songs
router.post('/addSongs', async(req,res)=> {
    const {title, artist, duration, genre, audioUrl} = req.body;
    try{
        
        const newSong = new Song({title, artist, duration, genre, audioUrl})
        await newSong.save();
        res.status(201).json(newSong)
    }
    catch(error){
        res.status(500).json({message: 'Error adding songs'})
    }
});

//play songs
router.get('/:songId/play', (req,res)=> {
    const songId = req.params.songId

    const song = Song.findById(songId)
    if(!song){
        return res.status(404).json({message: "Song not found"})
    }

    res.sendFile(__dirname + song.audio)
})

module.exports = router
