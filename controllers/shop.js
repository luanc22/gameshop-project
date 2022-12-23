const Game = require('../models/game');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
    res.render('shop/index', {pageTitle: 'GameShop', path: '/'})
};

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Game.fetchAll(games => {
            const cartGames = [];
            for(g of games) {
                const cartGameData = cart.games.find(game => game.id === g.id);
                if (cartGameData){
                    cartGames.push({gameData: g, qty: cartGameData.qty});
                }
            }
            res.render('shop/cart', {pageTitle: 'Your Cart', path: '/cart', gms: cartGames});
        });
    })
};

exports.postCart = (req, res, next) => {
    const gameId = req.body.gameId;
    Game.findById(gameId, (game) => {
        Cart.addGame(gameId, game.price);
    });
    res.redirect('/cart');
};

exports.postCartDeleteGame = (req, res, next) => {
    const gameId = req.body.gameId;
    Game.findById(gameId, game => {
        Cart.deleteGame(gameId, game.price);
        res.redirect('/cart');
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {pageTitle: 'Your Orders', path: '/orders'})
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {pageTitle: 'Checkout', path: '/checkout'})
};

exports.getGames = (req, res, next) => {
    Game.fetchAll(games => {
        res.render('shop/game-list', {gms: games, pageTitle: 'GameShop', path: '/games'});
    });
};

exports.getGameById = (req, res, next) => {
    const gameId = req.params.gameId;
    Game.findById(gameId, game => {
        res.render('shop/game-detail', {game: game, pageTitle: game.title, path: '/games'})
    });
};