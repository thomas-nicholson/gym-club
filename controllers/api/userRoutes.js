const router = require('express').Router();
const { User, Stats } = require('../../models');

const Sequelize = require('sequelize');
const { where } = require('sequelize');
const number = require('../../utils/randomNumber');

const Op = Sequelize.Op;

router.post('/', async (req, res) => {
    try {
      const userData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        picture: `/images/avatars/${number}.svg`
      });

      const newStats = await Stats.create({
        age: 0,
        description: "Description of yourself",
        height: 0.00,
        weight: 0,
        max_bench: 0,
        max_deadlift: 0,
        max_squat: 0,
        user_id: userData.id
    })
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(newStats);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

// This route allows you to update an image
router.put('/update/:id', async (req, res) => {
  try {
    const pictureUpdate = await User.update(
      {
        picture: req.body.picture,
      },
      {
        where: {
          id: req.params.id,
        }
      }
    )

    res.status(200).json(pictureUpdate)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res.status(400).json({});
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({});
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/search', async (req,res) => {
  try {
    const searchData = await User.findAll({
      where: {
        username: { 
          [Op.like] : "%"+ req.body.searchQuery +"%" }
        }
      });
    res.status(200).json(searchData);
  } catch (err) {
    log(err);
    res.status(400).json(err);
  }
})

  module.exports = router;