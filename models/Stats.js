const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Stats extends Model {}

Stats.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      height: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      max_bench: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      max_deadlift: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      max_squat: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'stats',
    }
  );
  
  module.exports = Stats;