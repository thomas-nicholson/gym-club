const User = require('./User');
const Blog = require('./Blog');
const Stats = require('./Stats');
const Comment = require('./Comments');
const Workout = require('./Workout')

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
Blog.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasOne(Stats, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Stats.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Blog.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Blog, {
  foreignKey: 'post_id'
});

User.hasMany(Workout, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Workout.belongsTo(User, {
foreignKey: 'user_id'
});

module.exports = { User, Blog, Stats, Comment };