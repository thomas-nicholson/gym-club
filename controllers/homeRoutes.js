const router = require('express').Router();
const { User, Blog, Stats, Comment} = require('../models');
const auth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username', 'id'],
                },
            ],
            order: [['id', 'DESC']],
        });

        const blogs = postData.map((blog) => blog.get({ plain: true}));

        let homeStatus;
        if (blogs[0] === undefined) {
            homeStatus = false
        } else {
            homeStatus = true
        }

        res.render('home', {
            homeStatus,
            blogs,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
    
});


router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/welcome', async (req, res) => {
    try {
        res.render('gateway');
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/signup', async (req, res) => {
    try {
        res.render('signup');
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/blog/:id', auth, async (req, res) => {
    try {

        const blogData = await Blog.findByPk(req.params.id, {
            include: [{
                model: User,
            },
            {
                model: Comment,
                include: [{
                    model:User,
                }]
            }],
        });
    
        const blog = blogData.get({ plain: true });
    
        res.render('blog', {
          ...blog,
          logged_in: req.session.logged_in
        });
      } catch (err) {
        res.status(500).json(err);
      }
})


router.get('/user/:id', auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Stats
                },
                {
                    model: Blog
                },
            ],
        });
    
        const users = user.get({ plain: true});
        res.render('user', {
            ...users,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
    
});

module.exports = router;
