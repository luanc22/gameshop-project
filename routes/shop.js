const path = require('path');
const express = require('express');
const shopController = require('../controllers/shop');
const gamesController = require('../controllers/admin');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteGame);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

router.get('/games/:gameId', shopController.getGameById);

router.get('/games', shopController.getGames);

module.exports = router;