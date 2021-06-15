const router = require('express').Router();
const { Exercise, Workout } = require('../../models');
const auth = require('../../utils/auth');

//   This allows you to add exercises to the workout
router.post('/add/:id', auth, async (req, res) => {
  try {
      const newExercise = await Exercise.create({
          exercise: req.body.exercise,
          reps: req.body.reps,
          sets: req.body.sets,
          workout_id: req.params.id
      })
      res.status(200).json(newExercise)

  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

  // This allows you to update exercises
router.put('/update/:id', auth, async (req, res) => {

  try {

    const exerciseData = await Exercise.findByPk(req.params.id, {include: {model: Workout}});
    const exercise = exerciseData.get({ plain: true });

    if (exercise.workout.user_id == req.session.user_id) {
      const exerciseUpdate = await Exercise.update(
        {
          exercise: req.body.exercise,
          reps: req.body.reps,
          sets: req.body.sets,
          workout_id: req.params.id
        },
        {
          where: {
            id: req.params.id
          },
        }
      );
      res.status(200).json(exerciseUpdate)
    } else {
      res.status(200).json({"message": "Could not update exercise"});
    }

    
  } catch (err) {
    res.status(500).json(err);
  }
});

  //   This allows you to delete exercises
router.delete('/delete/:id', auth, async (req, res) => {

  try {

    const exerciseData = await Exercise.findByPk(req.params.id, {include: {model: Workout}});
    const exercise = exerciseData.get({ plain: true });

    if (exercise.workout.user_id == req.session.user_id) {

      const exerciseDelete = await Exercise.destroy({
        where: {
          id: req.params.id,
        }
      });
      res.status(200).json(exerciseDelete)
    } else {
      res.status(200).json({"message": "Could not delete exercise"});

    }
  } catch (err) {
    res.status(500).json(err);
  }
});

  module.exports = router;