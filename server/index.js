console.log("current Environment " + process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
const { DATABASE_URL } = process.env;
const express = require('express');
const session = require('express-session');
const app = express ();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const sess = {
  secret: 'keyboard cat',
  cookie: {}
}
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess));

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000']
}
app.use(cors(corsOptions));

// Database
mongoose.set('strictQuery', false);
mongoose.connect(DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.log('db error'))
db.once('open', (success) => console.log('db loaded'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/public', express.static('public'));

// Routers
const projectsRouter = require('./routes/projects');
app.use('/projects', projectsRouter);

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const testsRouter = require('./routes/tests');
app.use('/tests', testsRouter);

app.listen(3030, () => console.log('API Server Running'));

module.exports = { 
  db: mongoose.connection 
};