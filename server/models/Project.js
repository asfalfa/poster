const mongoose = require('mongoose');

/* PetSchema will correspond to a collection in your MongoDB database. */
const ProjectSchema = new mongoose.Schema({ 
  id: {
    type: String,
  },
})

module.exports =  mongoose.model('Project', ProjectSchema)