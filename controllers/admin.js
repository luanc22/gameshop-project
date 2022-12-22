const Game = require('../models/game');

exports.getAddGame = (req, res, next) => {
    res.render('admin/add-game', {pageTitle: 'Add Game', path: '/admin/add-game'})
}

exports.postAddGame = (req, res, next) => {
    const title = req.body.title;
    const imageURL = req.body.imageUrl;
    const description = req.body.description;
    const genre = req.body.genre;
    const price = req.body.price;

    const game = new Game(title, imageURL, description, genre, price);
    game.save();
    res.redirect('/games');
}

exports.getAdminGames = (req, res, next) => {
    Game.fetchAll(games => {
        res.render('admin/games', {gms: games, pageTitle: 'Admin Listed Games', path: '/admin/games'});
    });
}

