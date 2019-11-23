const Player = require('../models/player.model');

function showPlayer(document) {
    console.log('\x1b[43m\x1b[31mPLAYER INFO:\x1b[0m')
    console.log(document)
}

function returnRandomInt(min, max) {
    let value = parseInt(Math.random() * (max - min) + min);
    return value;
}

function checkCreation() {
    // TODO
}

function notExist() {
    // TODO
}

module.exports = {
    createPlayer: function(req, res) {
        let player = new Player({
            name: req.body.name,
            level: 1,
            health_points: 100 + returnRandomInt(-20, 20),
            experience: 10 + returnRandomInt(-3, 3),
            attack: 10 + returnRandomInt(-2, 2),
            potions: {
                heal: [3, 10 + returnRandomInt(-2, 2)],
                strength: [1, 10 + returnRandomInt(-2, 2)]
            }
        });
        player.save(function(err) {
            if (err) {
                return (err);
            }
            showPlayer(player)
            res.send(player)
                // .status(500)
        })
    },

    getPlayer: function(req, res) {
        Player.findById(req.params.id, function(err, player) {
            if (err) return next(err);
            showPlayer(player);
            res.send(player);
        })
    },

    updatePlayer: function(req, res) {
        Player.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, player) {
            if (err) return next(err);
            res.send('Player udpated.');
        });
    },

    deletePlayer: function(req, res) {
        Player.findByIdAndRemove(req.params.id, function(err) {
            if (err) return next(err);
            res.send('Deleted successfully!');
        })
    }
}