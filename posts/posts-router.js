const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json({message: "You've reached the posts"})
})

module.exports = router;