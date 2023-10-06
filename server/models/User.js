const mongoose = require('mongoose');

/* PetSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema({ 
  id: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please provide the post's content"],
  },
  password: {
    type: String,
    required: [true, "Please provide the author's name"],
    maxlength: [60, "Author's Name cannot be more than 60 characters"],
  },
  token: {
    type: String,
  }
})

module.exports =  mongoose.model('User', UserSchema)