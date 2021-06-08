const router = require('express').Router();
const { Exercise } = require('../../models');

//   This allows you to add exercises to the workout
router.post('/add/:id', async (req, res) => {
    try {
        const newExercise = await Exercise.create({
            exercise: req.body.exercise,
            reps: req.body.reps,
            sets: req.body.sets,
            user_id: req.session.user_id,
            workout_id: req.params.id
        })
        res.status(200).json(newExercise)
  
    } catch (error) {
      res.status(400).json({ error: error.toString() });
    }
  });

  module.exports = router;