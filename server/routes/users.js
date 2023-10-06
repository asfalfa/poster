const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/User')

function hashAsync(req) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, async function(err, hash) {
                let password = hash;
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(req.body.email, salt, async function(err, hash) {
                        let id = hash;
                        await User.create({
                            id: id,
                            email: req.body.email,
                            password: password,
                        })
                    });
                });
            });
        });
    })
};

function compareAsync(req, db) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(req, db, function(err, res) {
            if (err) {
                 reject(err);
            } else {
                 resolve(res);
            }
        });
    });
};

router.get('/', async(req, res) => {
    try{
      res.status(200).send('hi');
    }catch(err){
        res.status(500).json({message: err.message});
    }   
});

module.exports = router;