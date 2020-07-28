const { post } = require('../auth/auth-router');

const Posts = require('./posts-model.js')

const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json({message: "You've reached the posts"})
})

router.get('/:id', (req, res) => {
    // Get a post by ID
    Posts.findById(req.params.id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            res.status(404).json({message:"Could not find post with specified id", error})
        })
})

router.get('/user/:user_id', (req, res) => {
    // Get all posts from a user
    Posts.findBy(req.params.user_id)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            res.status(404).json({message: "There was an error finding posts with that user id"})
        })
})

router.post('/user/:user_id', postValidator, (req, res) => {
    // Make new post with specified user id
    const newPost = {
        user_id:req.params.user_id,
        title:req.body.title,
        content:req.body.content,
        subreddit:req.body.subreddit
    }
    Posts.add(newPost)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(error => {
            res.status(400).json({message: "There was an error adding post to database"})
        })
})

function postValidator(req, res, next) {
    console.log(req.body.title)
    if(req.body.title){
        next()
    } else {
        res.status(400).json({message: "Post is invalid"})
    }
}

module.exports = router;