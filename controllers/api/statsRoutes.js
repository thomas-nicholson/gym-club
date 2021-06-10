// This will relate to the users profile page such as updating their age, height and max stats etc
// The get routes in homeRoutes.js will get the stats the on users profile page due to the foreign key relationship in the database
const router = require('express').Router();
const { User, Stats } = require('../../models');
const auth = require('../../utils/auth');

router.post('/newstats', async (req, res) => {
    try {
        const newStats = await Stats.create({
            age: 0,
            description: "Put description here",
            height: 0.00,
            weight: 0,
            max_bench: 0,
            max_deadlift: 0,
            max_squat: 0,
            user_id: 50
        })
        res.status(200).json(newStats);

    } catch (err) {
        res.status(400).json(err);
    }
});

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
                user_id: req.session.user_id
            },
            {
                where: {
                    id: req.params.id
                },
            }
        )
        res.status(200).json(statsUpdate);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;