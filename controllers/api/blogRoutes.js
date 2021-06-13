const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const auth = require('../../utils/auth');

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

 // This PUT allows you to update the blogs
router.put('/update/:id', async (req, res) => {

    try {
        const blogUpdate = await Blog.increment('likes', {by: 1, where: {
            id: req.params.id
        }}
        )
        res.status(200).json(blogUpdate)
    } catch (err) {
        res.status(500).json(err);
    }
});

// This POST allows you to create comments on blog
router.post('/comment/:id', async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment: req.body.comment,
            user_id: req.session.user_id,
            post_id: req.params.id
        })
        console.log(newComment)
        res.status(200).json(newComment)
    }   catch(error) {
        res.status(400).json({error: error.toString()});
    } 
});


// Delete comments, will need to figure out a way to tie it to only the blog owner or comment owner.
// router.delete('/commentdelete/:id', async (req, res) => {
//     try {
//         const commentDelete = await Comment.destroy({
//             where: {
//                 post_id: req.params.id
//             }
//         })
//         res.status(200).json(commentDelete)
//     }   catch (err) {
//         res.status(500).json(err);
//     }
// })

// This DELETE allows you to delete blogs
router.delete('/delete/:id', async (req, res) => {
    try {
        const commentDelete = await Comment.destroy({
            where: {
                post_id: req.params.id
            }
        })
        const blogDelete = await Blog.destroy({
            where: {
                id: req.params.id,
              //  user_id: 2
            }
        })
        res.status(200).json(blogDelete)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;