const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Exercise extends Model {}

Exercise.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      exercise: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reps: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sets: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      workout_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'workout',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'exercise',
    }
  );
  
  module.exports = Exercise;