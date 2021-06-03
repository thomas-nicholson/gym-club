const path = require('path');
const express = require('express');
// const session = require('express-session');
// const exphbs = require('express-handlebars');
// const routes = require('./controllers');
//Import helpers folder
//const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
//Import module to store sessions in database
//const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

//Links Helpers to handlebars
//const hbs = exphbs.create({ helpers });

//Session Middleware
/*
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize
    })
};*/
//app.use(session(sess));

//Handlebars+ helpers middleware
//app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

//Linking routes folder to express
//app.use(routes);

//set app to sync to database and listen for requests

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});