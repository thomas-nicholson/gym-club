const router = require('express').Router();
const { User, Blog } = require('../../models');
const auth = require('../../utils/auth');

// The structure for this is very similar to workoutRoutes.js
router.post('/newpost', auth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            title: req.body.title,
            description: req.body.description,
            user_id: req.session.user_id
        })
        res.status(200).json(newBlog);

    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;