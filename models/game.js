const fs = require('fs');
const path = require('path');
const { getGames } = require('../controllers/admin');

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
    constructor(title, imageUrl, description, genre, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.genre = genre;
        this.price = price;
    }

    save(){
        getGamesFromFile(games => {
            games.push(this);
            fs.writeFile(pathSave, JSON.stringify(games), (err) => {
                if(err != null)
                    console.log(err);
            });
        });
    }

    static fetchAll(callback) {
        getGamesFromFile(callback);
    }
}