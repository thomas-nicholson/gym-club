// List of all the route files
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes')
const workoutRoutes = require('./workoutRoutes');
const statRoutes = require('./statsRoutes');
const exerciseRoutes = require('./exerciseRoutes');

// List of all the routes used for these files
router.use('/users', userRoutes);
router.use('/blog', blogRoutes);
router.use('/workout', workoutRoutes);
router.use('/exercise', exerciseRoutes);
router.use('/stats', statRoutes);

module.exports = router;