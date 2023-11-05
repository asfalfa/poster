const mongoose = require('mongoose');

const MetricSchema = new mongoose.Schema({ 
  stats: {
    type: Number,
    required: true,
  },
  maxStats: {
    type: String,
  },
})

const AuthorUserSchema = new mongoose.Schema({ 
  avatar: {
    type: String,
  },
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
  },
})

const PostPermissionSchema = new mongoose.Schema({
  branch: {
    type: Boolean,
    required: true,
  },
  share: {
    type: Boolean,
    required: true,
  },
});
const PostInteractionSchema = new mongoose.Schema({  
  branches: {
    type: [AuthorUserSchema],
    required: true,
  },
  likes: {
    type: [AuthorUserSchema],
    required: true,
  },  
  shares: {
    type: [AuthorUserSchema],
    required: true,
  },
  bookmarks: {
    type: [AuthorUserSchema],
    required: true,
  },
  reports: {
    type: [AuthorUserSchema],
    required: true,
  },
  hidden: {
    type: [AuthorUserSchema],
    required: true,
  },
});

const BranchPermissionSchema = new mongoose.Schema({  
  private: {
    type: Boolean,
    required: true,
  },  
  allowedMembers: {
    type: [AuthorUserSchema]
  },
  collaborate: {
    type: Boolean,
    required: true,
  },
  branch: {
    type: Boolean,
    required: true,
  },
  share: {
    type: Boolean,
    required: true,
  },
});
const BranchInteractionSchema = new mongoose.Schema({  
  likes: {
    type: [AuthorUserSchema],
    required: true,
  },
  shares: {
    type: [AuthorUserSchema],
    required: true,
  },
  bookmarks: {
    type: [AuthorUserSchema],
    required: true,
  },
  reports: {
    type: [AuthorUserSchema],
    required: true,
  },
  hidden: {
    type: [AuthorUserSchema],
    required: true,
  },
  activityRate: {
    type: Number,
    required: true,
  },
  popularityRate: {
    type: Number,
    required: true,
  },
});

const PostSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  user: {
    type: AuthorUserSchema,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  permissions: {
    type: PostPermissionSchema,
    required: true,
  },
  interactions: {
    type: PostInteractionSchema,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  media: {
    type: [],
  },
});

const BranchSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  user: {
    type: AuthorUserSchema,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  default: {
    type: Boolean,
    required: true,
  },
  attached: {
    type: String,
  },
  permissions: {
    type: BranchPermissionSchema,
    required: true,
  },
  interactions: {
    type: BranchInteractionSchema,
    required: true,
  },
  posts: {
    type: [PostSchema],
  },
  updated: {
    type: Date
  }
});

const ProjectSchema = new mongoose.Schema({ 
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  user: {
    type: AuthorUserSchema,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  permissions: {
    type: BranchPermissionSchema,
    required: true,
  },
  metrics: {
    type: MetricSchema,
  },
  branches: {
    type: [BranchSchema],
  },
});

module.exports =  mongoose.model('Project', ProjectSchema)