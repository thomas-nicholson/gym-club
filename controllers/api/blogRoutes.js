const router = require('express').Router();
const { User, Blog} = require('../../models');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll();
        res.status(200).json(blogData);

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/newpost', async (req, res) => {
    try {
        const blogData = await Blog.create(req.body);
        res.status(200).json(blogData);

    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;