const path = require('path');
const express = require('express');

const rootDir = require('../helpers/path');

const router = express.Router();

const games = [];

router.get('/add-game', (req, res, next) => {
    res.render('add-game', {pageTitle: 'Add Game', path: '/admin/add-game'})
});

router.post('/add-game', (req, res, next) => {
    games.push({ title: req.body.title });
    res.redirect('/');
})

exports.routes = router;
exports.games = games;

