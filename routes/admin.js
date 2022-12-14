const path = require('path');
const express = require('express');

const rootDir = require('../helpers/path');

const router = express.Router();

router.get('/add-game', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-game.html'));
})

router.post('/add-game', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
})

module.exports = router;
