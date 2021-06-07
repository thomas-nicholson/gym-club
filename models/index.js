const User = require('./User');
const Blog = require('./Blog');
const Stats = require('./Stats');

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

module.exports = { User, Blog, Stats };