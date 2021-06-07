const router = require('express').Router();

router.get('/', (req, res) => {
    res.render("landing");
});

router.get('/login', (req, res) => {
    res.send("Login Route");
});

router.get('/signup', (req, res) => {
    res.send("Signup Route");
});

router.get('/users/self', (req, res) => {
    res.send("self user Route");
});

router.get('/users/self/newpost', (req, res) => {
    res.send("new post Route");
});

router.get('/users/:userid', (req,res) => {
    res.send(`Other User Route ${req.params.userid}`);
});

module.exports = router;
