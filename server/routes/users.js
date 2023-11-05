const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require('uuid');

const { CLIENT_ID, CLIENT_SECRET } = process.env;
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/User');

// Passport
passport.serializeUser(function(user, done) {
    done(null, user.googleId);
});
passport.deserializeUser(function(googleId, done) {
    User.findById(googleId, function(err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: "http://localhost:3030/users/callback",
        scope: [ 'profile' ],
        state: true
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user, profile, accessToken, refreshToken);
        });
    }
));

function hashOAuthTokenAsync(req) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.query.code, salt, async function(err, hash) {
                const token = hash;
                const user = await User.findOne({ googleId: req.user.googleId });
                user.token = token;
                if(!user.id){
                    user.id = uuidv4();
                };
                if(!user.username){
                    user.username = req.authInfo.displayName;
                };
                if(!user.avatar){
                    user.avatar = req.authInfo.photos[0].value;
                };
                user.save();
            });
        });
    });
};

function compareOAuthTokenAsync(req, db) {
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

router.get('/auth', passport.authenticate('google'));
router.get('/callback',
  passport.authenticate('google', { failureRedirect: "http://localhost:3000/login", failureMessage: true }),
  (req, res) => {
    hashOAuthTokenAsync(req);
    res.redirect('http://localhost:3000/login?code=' + req.query.code +'&googleId=' + req.user.googleId);
});

router.post('/check', async(req, res) => {
    // here we would check if the token saved by the frontend in localStorage is equal to the encrypted token saved in db;
    // maybe we should check first if the token is still alive in db, since it should expire after 24h
    const user = await User.findOne({ googleId: req.body.googleId });
    if(user && user.token){
        const compare = await compareOAuthTokenAsync(req.body.token, user.token);
        if(compare == true){
            res.status(200).json({valid: true, user: user}); 
        }else{
            res.status(200).json({valid: false, reason: 'User token not matching.'}); 
        }
    }else if(user){

    }
    else{
        res.status(200).json({valid: false, reason: 'The user could not be found.'}); 
    }
});


router.post('/logout', async(req, res) => {
    const user = await User.findOne({ googleId: req.body.googleId });
    if(user && user.token){
        const compare = await compareOAuthTokenAsync(req.body.token, user.token);
        if(compare == true){
            user.token == null;
            user.save();

            res.status(200).json({valid: true}); 
        }else{
            res.status(200).json({valid: false}); 
        }
    }else{
        res.status(200).json({valid: false}); 
    }
});

module.exports = router;