const fs = require('fs');
const path = require('path');

const pathSave = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

module.exports = class Cart {
    static addGame(id, gamePrice){
        fs.readFile(pathSave, (err, fileContent) => {
            let cart = {games: [], totalPrice: 0};
            if(!err ){
                cart = JSON.parse(fileContent);
            }

            const existingGameInCartIndex = cart.games.findIndex(game => game.id === id);
            const existingGameInCart = cart.games[existingGameInCartIndex];
            let updatedGame;
            if(existingGameInCart) {
                updatedGame = {...existingGameInCart};
                updatedGame.qty = updatedGame.qty + 1;
                cart.games = [...cart.games];
                cart.games[existingGameInCartIndex] = updatedGame;
            } else {
                updatedGame = { id: id, qty: 1 };
                cart.games = [...cart.games, updatedGame];
            }
            cart.totalPrice = cart.totalPrice + +gamePrice;
            fs.writeFile(pathSave, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }

    static deleteGame(id, gamePrice){
        fs.readFile(pathSave, (err, fileContent) => {
            if(err){
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const game = updatedCart.games.find(game => game.id === id);
            if(!game){
                return;
            }
            const gameQty = game.qty;
            updatedCart.games = updatedCart.games.filter(game => game.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - gamePrice * gameQty;
            fs.writeFile(pathSave, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    }  
    
    static getCart(callback) {
        fs.readFile(pathSave, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if(err){
                callback(null);
            } else {
                callback(cart);
            }
        });
    }
}