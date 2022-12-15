const path = require('path');
const express = require('express');

const rootDir = require('../helpers/path');

const router = express.Router();
const adminData = require('./admin');

router.get('/', (req, res, next) => {
    res.render('shop');
});

module.exports = router;    