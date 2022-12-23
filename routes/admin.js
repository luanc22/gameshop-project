const path = require('path');
const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/add-game', adminController.getAddGame);

router.post('/add-game', adminController.postAddGame);

router.get('/games', adminController.getAdminGames);

router.get('/edit-game/:gameId', adminController.getEditGame);

router.post('/edit-game', adminController.postEditGame);

router.post('/delete-game', adminController.postDeleteGame);

module.exports = router;