const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Passport Configuration
require('./configurations/passport')(passport);


// Database Configuration
const db = require('./configurations/keys').MongoURI;

// Connection to MongoDB
mongoose.connect(db, {useNewUrlParser: true})
.then(() => console.log('MongoDB is connected..'))
.catch(err => console.log(err));

// Embedded JS
app.use(expressLayouts);
app.set('view engine', 'ejs')

// BodyParser
app.use(express.urlencoded({ extended:false }));

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Connect Flash
app.use(flash());


// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


// Router Configure
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
