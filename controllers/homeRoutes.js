const router = require('express').Router();
const { User, Blog, Stats, Comment, Workout, Exercise} = require('../models');
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
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
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
router.get('/blog/:id', auth,  async (req, res) => {
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
          logged_in: req.session.logged_in,
          user_id: req.session.user_id
        });
      } catch (err) {
        res.status(500).json(err);
      }
})


router.get('/user/:id', auth,  async (req, res) => {
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

        let allowIconEdit;
        if (req.params.id == req.session.user_id) {
            allowIconEdit = true;
        } else {
            allowIconEdit = false;
        }
    
        const users = user.get({ plain: true});
        res.render('user', {
            ...users,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
            allowIconEdit
        });
    } catch (err) {
        res.status(500).json(err);
    }
    
});

router.get('/userBlogs/:id', auth,  async (req, res) => {
    try {
        const userBlogData = await Blog.findAll({
            where: {
                user_id: req.params.id
            },
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

        const id = req.params.id
    
        const userBlog = userBlogData.map((blog) => blog.get({ plain: true}));

        res.render('userBlogs', {
          userBlog,
          id,
          logged_in: req.session.logged_in,
          user_id: req.session.user_id
        });
      } catch (err) {
        res.status(500).json(err);
      }        
})

router.get('/newBlog', auth,  async (req, res) => {
    res.render('newBlog', {
        logged_in: req.session.logged_in,
        user_id: req.session.user_id
    })
})

router.get('/userWorkouts/:id', auth,  async (req, res) => {
    try {
        const userWorkouts = await Workout.findAll({
            where: {
                user_id: req.params.id
            }
        })
        const id = req.params.id
    
        const workouts = userWorkouts.map((workout) => workout.get({ plain: true}));

        res.render('userWorkouts', {
          workouts,
          id,
          logged_in: req.session.logged_in,
          user_id: req.session.user_id
        });
      } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/exercises/:id', auth,  async (req, res) => {
    try {
        const workoutExercises = await Exercise.findAll({
            where: {
                workout_id: req.params.id
            }
        })
        const id = req.params.id
    
        const exercises = workoutExercises.map((exercise) => exercise.get({ plain: true}));

        res.render('exercises', {
          exercises,
          id,
          logged_in: req.session.logged_in,
          user_id: req.session.user_id
        });
      } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/newWorkout', auth,  async (req, res) => {
    try {
        const workoutExercises = await Exercise.findAll()
    
        const exercises = workoutExercises.map((exercise) => exercise.get({ plain: true}));

        res.render('newWorkout', {
            exercises,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
        });
      } catch (err) {
        res.status(500).json(err);
      }
})

router.get('/editStats/:id', auth,  async (req, res) => {
    const id = req.params.id
    console.log(id)
    res.render('editStats', {
        id,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id
    })
})

module.exports = router;
