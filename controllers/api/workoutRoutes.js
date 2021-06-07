const router = require('express').Router();
const { Workout, Exercise } = require('../../models');

router.post('/add', async (req, res) => {
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

router.put('/update/:id', async (req, res) => {
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

module.exports = router;