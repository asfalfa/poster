const express = require('express');
const router = express.Router();

const multer  = require('multer');
const fs = require('fs-extra');

const { v4: uuidv4 } = require('uuid');

const DIR = './public/post-attachments/temp';
const User = require('../models/User');
const Project = require('../models/Project');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, fileName)
    }
});
let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
});

async function checkMetrics(projects) {
    let metrics = [];
    for(let i = 0; i < projects.length; i++){
        let stats = 0;
        let maxStats = {
            id: null,
            stats: 0,
        };

        for(let branch of projects[i].branches){
            const sum = branch.interactions.activityRate + branch.interactions.popularityRate;
            if (sum > maxStats.stats){
                maxStats.id = branch.id;
                maxStats.stats = sum;
            }
            stats = stats + sum;
        }

        metrics[i] = {
            stats: stats,
            maxStats: maxStats.id,
        }
        projects[i].metrics = metrics[i];
        
        projects[i].save();
    }
  }

// getPosts
router.get('/', async(req, res) => {
    try{
        const projects = await Project.find();
        checkMetrics(projects);
        res.status(200).json(projects);
    }catch(err){
        res.status(500).json({message: err.message});
    }   
});

// getPostData
router.get('/:id', async(req, res) => {
    try{
        const project = await Project.findOne({ id: req.params.id });
        res.json(project);
    }catch(err){
        res.status(500).json({message: err.message});
    }   
});

router.get('/:project/:branch', async(req, res) => {
    try{
        const project = await Project.findOne({ id: req.params.project });
        const branchIndex = (project.branches).map(x => x.id).indexOf(req.params.branch);

        res.json({
            branch: project.branches[branchIndex],
            index: branchIndex,
        });
    }catch(err){
        res.status(500).json({message: err.message});
    }   
});

// updateBranchInteractions
router.post('/interactions/:project/:branch', async(req, res) => {
    try{
        const interaction = req.body.interaction;
        const user = req.body.user;
        const project = await Project.findOne({ id: req.params.project });
        const branchIndex = (project.branches).map(x => x.id).indexOf(req.params.branch);

        if(interaction == 'removelikes'){
            const userIndex = project.branches[branchIndex].interactions['likes'].findIndex(x => x.id === user.id);
            project.branches[branchIndex].interactions['likes'].splice(userIndex);
            project.save();
            res.status(200).json({
                valid: true, 
                interaction: project.branches[branchIndex].interactions['likes'],
            });
        } else if(interaction == 'removebookmarks'){
            const userIndex = project.branches[branchIndex].interactions['bookmarks'].findIndex(x => x.id === user.id);
            project.branches[branchIndex].interactions['bookmarks'].splice(userIndex);
            project.save();
            res.status(200).json({
                valid: true, 
                interaction: project.branches[branchIndex].interactions['bookmarks'],
            });
        } else{
            project.branches[branchIndex].interactions[interaction].push(user);
            project.save();
            res.status(200).json({
                valid: true, 
                interaction: project.branches[branchIndex].interactions[interaction],
            });
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

// updatePostInteractions
router.post('/interactions/:project/:branch/:post', async(req, res) => {
    try{
        const interaction = req.body.interaction;
        const user = req.body.user;
        const project = await Project.findOne({ id: req.params.project });
        const branchIndex = (project.branches).map(x => x.id).indexOf(req.params.branch);
        const postIndex = (project.branches[branchIndex].posts).map(x => x.id).indexOf(req.params.post);

        if(interaction == 'removelikes'){
            const userIndex = project.branches[branchIndex].posts[postIndex].interactions['likes'].indexOf(x => x.id === user.id);
            project.branches[branchIndex].posts[postIndex].interactions['likes'].splice(userIndex);
            project.save();
            res.status(200).json({
                post: project.branches[branchIndex].posts[postIndex],
                valid: true, 
                interaction: project.branches[branchIndex].posts[postIndex].interactions['likes'],
            });
        } else if(interaction == 'removebookmarks'){
            const userIndex = project.branches[branchIndex].posts[postIndex].interactions['bookmarks'].indexOf(x => x.id === user.id);
            project.branches[branchIndex].posts[postIndex].interactions['bookmarks'].splice(userIndex);
            project.save();
            res.status(200).json({
                post: project.branches[branchIndex].posts[postIndex],
                valid: true, 
                interaction: project.branches[branchIndex].posts[postIndex].interactions['bookmarks'],
            });
        }else{
            project.branches[branchIndex].posts[postIndex].interactions[interaction].push(user);
            project.save();
            res.status(200).json({
                post: project.branches[branchIndex].posts[postIndex],
                valid: true, 
                interaction: project.branches[branchIndex].posts[postIndex].interactions[interaction],
            });
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

// postProject
router.post('/create', async(req, res) => {
    try{
        const data = req.body;
        const user = JSON.parse(data.user);
        const permissions = JSON.parse(data.permissions);
        // We need to check what permissions the user wants for the project
        // Probably just by having some checkboxes in the form
        // Then, if checkbox is checked, we set that permission to true
        const zeroInteractions = {
            likes: [],
            shares: [],
            bookmarks: [],
            reports: [],
            hidden: [],
            activityRate: 0,
            popularityRate: 0,
        };
        const defaultBranch = [
            {
                id: uuidv4(),
                name: 'main',
                user: user,
                description: data.description,
                default: true,
                permissions: permissions,
                interactions: zeroInteractions,
                updated: Date.now()
            }
        ];

        const project = {
            id: uuidv4(),
            name: data.name,
            user: user,
            description: data.description,
            permissions: permissions,
            branches: defaultBranch,
        };

        const contribution = {
            project: project.id,
            branch: defaultBranch.id,
        }
        const dbUser = await User.findOne({ id: user.id });
        if(dbUser.contributions && dbUser.contributions.branches){
            dbUser.contributions.branches.push(contribution);
        }else if (dbUser.contributions){
            console.log('bye');
            dbUser.contributions.branches = [contribution];
        } else{
            dbUser.contributions = {
                branches: [contribution],
            }
        }
        dbUser.save();

        await Project.create(project);

        res.status(200).json({valid: true});
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

router.post('/create/:project', async(req, res) => {
    try{
        const data = req.body;
        const user = JSON.parse(data.user);
        const project = await Project.findOne({ id: req.params.project });
        const permissions = JSON.parse(data.permissions);
        const zeroInteractions = {
            likes: [],
            shares: [],
            bookmarks: [],
            reports: [],
            hidden: [],
            activityRate: 0,
            popularityRate: 0,
        };

        const newBranch = {
            id: uuidv4(),
            name: data.name,
            user: user,
            description: data.description,
            default: false,
            permissions: permissions,
            interactions: zeroInteractions,
            updated: Date.now()
        };
        project.branches.push(newBranch);
        project.save();

        const contribution = {
            project: project.id,
            branch: newBranch.id
        }
        const dbUser = await User.findOne({ id: user.id });
        if(dbUser.contributions && dbUser.contributions.branches){
            dbUser.contributions.branches.push(contribution);
        }else if (dbUser.contributions){
            dbUser.contributions.branches = [contribution];
        } else{
            dbUser.contributions = {
                branches: [contribution],
            }
        }
        dbUser.save();

        res.status(200).json({valid: true});
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

router.post('/create/:project/:branch', 
    upload.fields([{ name: 'media', maxCount: 10 }]),
    async(req, res) => {
    try{
        // Basic info
        const data = req.body;
        const user = JSON.parse(data.user);
        const postId = uuidv4();
        const project = await Project.findOne({ id: req.params.project });
        const branchIndex = (project.branches).map(x => x.id).indexOf(req.params.branch);
        const permissions = JSON.parse(data.permissions);
        const zeroInteractions = {
            branches: [],
            likes: [],
            shares: [],
            bookmarks: [],
            reports: [],
            hidden: [],
        };

        // Image Upload
        const imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;
        const dir = postId;
        const url = req.protocol + '://' + req.get('host');

        let media = [];
        for (let i = 0; i < req.files.media.length; i++) {
            let result = (req.files.media[i].filename).match(imageReg);
            const uuid = uuidv4();
            media.push(url + '/public/post-attachments/' + dir + '/media/' + uuid + result[0]);
            fs.move('./public/post-attachments/temp/' + req.files.media[i].filename, './public/post-attachments/' + dir + '/media/' + uuid + result[0], function (err) {
                if (err) {
                    return console.error(err);
                }
            });
        }

        // Post Creation and Project Update
        const newPost = {
            id: postId,
            user: user,
            date: Date.now(),
            permissions: permissions,
            interactions: zeroInteractions,
            content: data.content,
            media: media
        };
        project.branches[branchIndex].updated = Date.now();
        if(project.branches[branchIndex].posts){
            project.branches[branchIndex].posts.push(newPost);
        } else {
            project.branches[branchIndex].posts = [newPost];
        }
        project.save();

        // Update User Contributions
        const contribution = {
            project: project.id,
            branch: project.branches[branchIndex].id,
            post: postId
        }
        const dbUser = await User.findOne({ id: user.id });
        if(dbUser.contributions && dbUser.contributions.posts){
            dbUser.contributions.posts.push(contribution);
        }else if (dbUser.contributions){
            dbUser.contributions.posts = [contribution];
        } else{
            dbUser.contributions = {
                posts: [contribution],
            }
        }
        dbUser.save();

        res.status(200).json({valid: true});
    }catch(err){
        res.status(500).json({message: err.message});
    }
})


module.exports = router
