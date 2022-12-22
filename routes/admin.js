const path = require('path');
const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/add-game', adminController.getAddGame);

router.post('/add-game', adminController.postAddGame);

router.get('/games', adminController.getAdminGames);

module.exports = router;