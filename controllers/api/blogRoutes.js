const router = require('express').Router();
const { User, Blog } = require('../../models');

// The structure for this is very similar to workoutRoutes.js
router.post('/newpost', async (req, res) => {
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

 // This allows you to update the blogs
router.put('/update/:id', async (req, res) => {
    try {
        const blogUpdate = await Blog.update(
            {
                title: req.body.title,
                description: req.body.description,
                date_created: req.body.date_created,
                user_id: req.params.id
            },
            {
                where: {
                    id: req.params.id
                },
            }
        )
        res.status(200).json(blogUpdate)
    } catch (err) {
        res.status(500).json(err);
    }
});

// THis allows you to delete blogs
router.delete('/delete/:id', async (req, res) => {
    try {
        const blogDelete = await Blog.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(blogDelete)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;