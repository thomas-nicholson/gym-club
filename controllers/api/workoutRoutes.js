const router = require('express').Router();
const { Workout, Exercise } = require('../../models');

router.post('/addworkout', async (req, res) => {
    try {
        const newWorkout = await Workout.create({
            title: req.body.title,
            description: req.body.description,
            user_id: req.body.user_id
            // user_id: req.session.user_id
        })
        res.status(200).json(newWorkout);

    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;