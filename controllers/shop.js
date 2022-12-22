const Game = require('../models/game');

exports.getIndex = (req, res, next) => {
    res.render('shop/index', {pageTitle: 'GameShop', path: '/'})
} 

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {pageTitle: 'Your Cart', path: '/cart'})
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {pageTitle: 'Your Orders', path: '/orders'})
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {pageTitle: 'Checkout', path: '/checkout'})
}

exports.getGames = (req, res, next) => {
    Game.fetchAll(games => {
        res.render('shop/game-list', {gms: games, pageTitle: 'GameShop', path: '/games'});
    });
}   