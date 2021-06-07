const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes')
const workoutRoutes = require('./workoutRoutes')

router.use('/users', userRoutes);
router.use('/blog', blogRoutes);
router.use('/workout', workoutRoutes);

module.exports = router;