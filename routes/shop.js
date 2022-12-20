const path = require('path');
const express = require('express');

const rootDir = require('../helpers/path');

const router = express.Router();
const adminData = require('./admin');

router.get('/', (req, res, next) => {
    const games = adminData.games;
    res.render('shop', {gms: games, pageTitle: 'GameShop', path: '/'});
});

module.exports = router;    