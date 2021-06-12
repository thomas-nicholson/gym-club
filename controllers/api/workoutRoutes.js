const router = require('express').Router();
const { Workout, Exercise } = require('../../models');
const auth = require('../../utils/auth');

// This allows you to addd workouts
router.post('/add', auth, async (req, res) => {
    try {
        const newWorkout = await Workout.create({
            title: req.body.title,
            description: req.body.description,
            user_id: req.session.user_id
        })
        res.status(200).json(newWorkout);

    } catch (err) {
        res.status(400).json(err);
    }
});

// This allows you to update workouts
router.put('/update/:id', auth, async (req, res) => {
    try {
      const workoutUpdate = await Workout.update(
        {
          title: req.body.title,
          description: req.body.description,
        },
        {
          where: {
            id: req.params.id,
            user_id: req.session.user_id
          },
        }
      )
  
      res.status(200).json(workoutUpdate)
    } catch (err) {
      res.status(500).json(err);
    }
  });

//   This allows you to delete workouts
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    const workoutDelete = await Workout.destroy({
        where: {
            id: req.params.id,
            user_id: req.session.user_id
        }
    })

    res.status(200).json(workoutDelete)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;