const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const pathSave = path.join(path.dirname(process.mainModule.filename), 
    'data',
    'games.json'
    );

const getGamesFromFile = callback => {
    fs.readFile(pathSave, (err, filecontent) => {
        if(err){
            callback([]);
        } else {
            callback(JSON.parse(filecontent));
        }
    });
}

module.exports = class Game {
    constructor(id, title, imageUrl, description, genre, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.genre = genre;
        this.price = price;
    }

    save() {
        getGamesFromFile(games => {
          if (this.id) {
            const existingGameIndex = games.findIndex(
                game => game.id === this.id
            );
            const updatedGames = [...games];
            updatedGames[existingGameIndex] = this;
            fs.writeFile(pathSave, JSON.stringify(updatedGames), err => {
              console.log(err);
            });
          } else {
            this.id = Math.random().toString();
            games.push(this);
            fs.writeFile(pathSave, JSON.stringify(games), err => {
              console.log(err);
            });
          }
        });
      }

    static deleteById(id) {
        getGamesFromFile(games => {
            const game = games.find(game => game.id === id);
            const updatedGames = games.filter(g => g.id !== id);
            fs.writeFile(pathSave, JSON.stringify(updatedGames), err => {
                if(!err){
                    Cart.deleteGame(id, game.price);
                }
            });
        });
    }

    static fetchAll(callback) {
        getGamesFromFile(callback);
    }

    static findById(id, callback) {
        getGamesFromFile(games => {
            const game = games.find(g => g.id === id);
            callback(game);
        })
    }   
}