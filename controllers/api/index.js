const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes')
const workoutRoutes = require('./workoutRoutes');
const statRoutes = require('./statsRoutes');
const exerciseRoutes = require('./exerciseRoutes');

router.use('/users', userRoutes);
router.use('/blog', blogRoutes);
router.use('/workout', workoutRoutes);
router.use('/exercise', exerciseRoutes);
router.use('/stats', statRoutes);

module.exports = router;