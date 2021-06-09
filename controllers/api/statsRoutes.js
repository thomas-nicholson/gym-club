// This will relate to the users profile page such as updating their age, height and max stats etc
// The get routes in homeRoutes.js will get the stats the on users profile page due to the foreign key relationship in the database
const router = require('express').Router();
const { Stats } = require('../../models');

// router.post('/', async (req, res) => {
//     try {
//         const userData = await Stats.create(req.body);

        
//     }
// })

module.exports = router;