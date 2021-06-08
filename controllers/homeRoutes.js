const router = require('express').Router();
const { User, Blog, Stats, Comment} = require('../models');
// const withAuth = require('../utils/auth');
// const redirect= require('../utils/redirect');
// const home = require('../utils/home');

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

router.get('/blog/:id', async (req, res) => {
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
router.get('/login', async (req, res) => {
    res.render("landing");
});

router.get('/user/:id', async (req, res) => {
    // if (req.session.user_id === undefined){
    //     res.redirect('../');
    // }
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

    try {
        res.render('user', {
            ...users,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
    
});

router.get('/users/self/newpost', (req, res) => {
    res.send("new post Route");
});

router.get('/profile/:userid', (req,res) => {
    res.send(`Other User Route ${req.params.userid}`);
});

module.exports = router;
