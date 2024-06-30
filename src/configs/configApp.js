module.exports = function configApp(express, app){

    const hbs = require('express-handlebars');
    const session = require('express-session');
    const flash = require('connect-flash');
    const path = require('path');

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(express.static(path.join(__dirname, '../public')))

    app.engine('hbs', hbs.engine({
        defaultLayout: 'main',
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, '../views'));

    app.use(session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true
    })); app.use(flash())
    

}