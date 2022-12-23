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

    const game = new Game(null, title, imageURL, description, genre, price);
    game.save();
    res.redirect('/games');
}

exports.getEditGame = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const gameId = req.params.gameId;
    Game.findById(gameId, game =>{
        if(!game){
            res.redirect("/");
        }
        res.render('admin/edit-game', {pageTitle: 'Edit Game', path: '/admin/edit-game', editing: editMode, game: game})
    } )
}

exports.postEditGame = (req, res, next) => {
    const gameId = req.body.gameId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedGenre = req.body.genre;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedGame = new Game(gameId, updatedTitle, updatedImageUrl, updatedDesc, updatedGenre, updatedPrice);
    updatedGame.save();
    res.redirect('/admin/games');
}

exports.postDeleteGame = (req, res, next) => {
    const gameId = req.body.gameId;
    Game.deleteById(gameId);
    res.redirect('/admin/games');
}

exports.getAdminGames = (req, res, next) => {
    Game.fetchAll(games => {
        res.render('admin/games', {gms: games, pageTitle: 'Admin Listed Games', path: '/admin/games'});
    });
}

