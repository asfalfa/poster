const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    try{
      res.status(200).send('hi');
    }catch(err){
        res.status(500).json({message: err.message});
    }   
});

module.exports = router;