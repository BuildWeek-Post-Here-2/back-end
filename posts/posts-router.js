const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json({message: "You've reached the posts"})
})

router.get('/:id', (req, res) => {
    // Get a post by ID
})

router.get('/user/:user_id', (req, res) => {
    // Get all posts from a user
})

router.post('/user/:user_id', (req, res) => {
    // Make a post to a user
})

module.exports = router;