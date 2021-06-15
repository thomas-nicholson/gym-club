// This will relate to the users profile page such as updating their age, height and max stats etc
// The get routes in homeRoutes.js will get the stats the on users profile page due to the foreign key relationship in the database
const router = require('express').Router();
const { User, Stats } = require('../../models');
const auth = require('../../utils/auth');

// Updates the statistics of the user
router.put('/update/:id', async (req, res) => {
    try {
        const statsUpdate = await Stats.update(
            {
                age: req.body.age,
                description: req.body.description,
                height: req.body.height,
                weight: req.body.weight,
                max_bench: req.body.max_bench,
                max_deadlift: req.body.max_deadlift,
                max_squat: req.body.max_squat,
            },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id
                },
            }
        )
        res.status(200).json(statsUpdate);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;