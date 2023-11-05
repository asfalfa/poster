const mongoose = require('mongoose');
const findOrCreate = require ('mongoose-findorcreate');

const PostContributionSchema = new mongoose.Schema({  
  project: {
    type: String,
  },  
  branch: {
    type: String,
  },
  post: {
    type: String,
  }
});
const BranchContributionSchema = new mongoose.Schema({  
  project: {
    type: String,
  },  
  branch: {
    type: String,
  }
});

const UserContributionSchema = new mongoose.Schema({
  branches: {
    type: [BranchContributionSchema],
  },
  posts: {
    type: [PostContributionSchema],
  },
});

const UserInteractionSchema = new mongoose.Schema({  
  likes: {
    type: [String],
  },  
  shares: {
    type: [String],
  },
  bookmarks: {
    type: [String],
  },
  reports: {
    type: [String],
  },
  hidden: {
    type: [String],
  },
});

const UserOAuthSchema = new mongoose.Schema({
  token: {
    type: String,
    expires: 86400,
  },
  refreshToken: {
    type: String,
  },
});

const UserSchema = new mongoose.Schema({
  avatar: {
    type: String,
  },
  id: {
    type: String,
  },
  username: {
    type: String,
  },
  nickname: {
    type: String,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
  token: {
    type: String,
    expires: 86400,
  },
  contributions: UserContributionSchema,
  interactions: UserInteractionSchema,
})

UserSchema.plugin(findOrCreate);

module.exports =  mongoose.model('User', UserSchema)