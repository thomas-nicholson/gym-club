const sequelize = require('../config/connection');
const { User, Blog, Stats, Comment, Workout, Exercise } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const statsData = require('./statsData.json');
const commentData = require('./commentData.json');
const workoutData = require('./workoutData.json');
const exerciseData = require('./exerciseData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    const posts = await Blog.bulkCreate(blogData, {
      returning: true,
    });

    const stats = await Stats.bulkCreate(statsData, {
      returning: true,
    });

    const comments = await Comment.bulkCreate(commentData, {
      returning: true,
    });

    const workouts = await Workout.bulkCreate(workoutData, {
      returning: true,
    });

    const exercise = await Exercise.bulkCreate(exerciseData, {
      returning: true,
    });
  
    process.exit(0);
  };
  
  seedDatabase();