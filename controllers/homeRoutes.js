const router = require('express').Router();
const { User, Blog, Stats, Comment, Workout, Exercise, hasLiked} = require('../models');
const auth = require('../utils/auth');
const correctUser = require('../utils/correctUser');

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

router.get('/changeicon', auth, async (req, res) => {
    try {
        res.render('chooseIcon', {
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
        });
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
                }],
            }],
            order: [
                [{ model: Comment }, 'id', 'DESC']
             ]
        });

        
    
        const blog = blogData.get({ plain: true });

        const liked = await hasLiked.findAll({
            where: {
                post_id: req.params.id,
                user_id: req.session.user_id
            }
        })

        const haveLiked = liked.map((like) => like.get({ plain: true}))
        console.log(haveLiked)

        let allowEdit;
        if (blog.user_id == req.session.user_id) {
            allowEdit = true;
        } else {
            allowEdit = false;
        }

        let allowLike;
        if (haveLiked.length){
            allowLike = false
        }
        else{
            allowLike = true
        }
    
        res.render('blog', {
          ...blog,
          allowLike,
          logged_in: req.session.logged_in,
          user_id: req.session.user_id,
          allowEdit
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
                }],
                order: [['id', 'DESC']],
            }],
            order: [['id', 'DESC']]
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
            },
            order: [['id', 'DESC']]
        })
        const id = req.params.id
    
        const workouts = userWorkouts.map((workout) => workout.get({ plain: true}));


        let allowWorkoutEdit;
        if (req.params.id == req.session.user_id) {
            allowWorkoutEdit = true;
        } else {
            allowWorkoutEdit = false;
        }

        res.render('userWorkouts', {
          workouts,
          id,
          allowWorkoutEdit,
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
            },
            include: {
                model: Workout,
            },
        })

        const id = req.params.id
    
        const exercises = workoutExercises.map((exercise) => exercise.get({ plain: true}));


        let allowExerciseEdit;
        let showUp
        if (exercises[0] === undefined) {
            allowExerciseEdit = false;
            showUp = true;
        } else if (exercises[0].workout.user_id == req.session.user_id) {
            allowExerciseEdit = true;
            showUp = true;
        } else {
            allowExerciseEdit = false;
            showUp = false;
        }

       

        res.render('exercises', {
          exercises,
          id,
          allowExerciseEdit,
          showUp,
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

router.get('/editStats/:id', auth, correctUser,  async (req, res) => {
    const userStats = await Stats.findAll({
        where: {
            user_id: req.params.id,
        }
    })

    const id = req.params.id
    const statsy = userStats.map((staty) => staty.get({ plain: true } ));
    res.render('editStats', {
        id,
        statsy,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
    })
})

module.exports = router;
