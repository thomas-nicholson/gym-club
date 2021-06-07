const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes')
const workoutRoutes = require('./workoutRoutes')
const statRoutes = require('./statsRoutes')

router.use('/users', userRoutes);
router.use('/blog', blogRoutes);
router.use('/workout', workoutRoutes);
router.use('/stats', statRoutes);

module.exports = router;