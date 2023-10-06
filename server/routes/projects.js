const express = require('express');
const router = express.Router();

const Project = require('../models/Project');

// getPosts
router.get('/', async(req, res) => {
    try{
        const posts = await Project.find();
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json({message: err.message});
    }   
})

// getPostData
router.get('/:id', async(req, res) => {
    try{
        const post = await Project.findOne({ id: req.params.id });
        res.json(post);
    }catch(err){
        res.status(500).json({message: err.message});
    }   
})

module.exports = router
