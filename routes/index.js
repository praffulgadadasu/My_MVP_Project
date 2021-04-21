const express = require('express');
const router = express.Router();

const { ensureAuthenticated, forwardAuthenticated } = require('../configurations/auth');

// Welcome or Home Page for the Website!
router.get('/', (req, res) => res.render('home'));


// Dashboard or Overview
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {
    name: req.user.name
}));

module.exports = router;