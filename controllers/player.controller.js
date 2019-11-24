const Player = require('../models/player.model');

function showPlayer(document) {
    console.log('\x1b[43m\x1b[31mPLAYER INFO:\x1b[0m')
    console.log(document)
}

function returnRandomInt(min, max) {
    let value = parseInt(Math.random() * (max - min) + min);
    return value;
}

function checkName(name) {
    var i = 0
    var character = ''
    var result = false
    var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
    while (i <= (name.length - 1)) {
        character = name.charAt(i);
        if (!isNaN(character * 1)) {
            result = false
        } else {
            if (character == character.toUpperCase()) {
                result = true
            }
            if (character == character.toLowerCase()) {
                result = true
            }
        }
        i++;
    }
    for (i = 0; i < specialChars.length; i++) {
        if (name.indexOf(specialChars[i]) > -1) {
            result = false
        }
    }
    return result
}

module.exports = {
    createPlayer: function(req, res) {
        if (checkName(req.body.name)) {
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
                    res.status(500).send('500 - Internal Error')
                    return (err);
                }
                res.status(201).send(player)
                console.log('\x1b[33mPlayer ' + req.body.name + ' Created\x1b[0m\n')
            })
        } else {
            res.status(400).send('400 - Bad Request')
        }
    },

    getPlayer: function(req, res) {
        Player.findById(req.params.id, function(err, player) {
            if (err) {
                console.log('\x1b[33mPlayer ' + req.params.id + ' Not Found\x1b[0m\n')
                res.status(404).send('404 - Player Not Found')
                return err
            }
            if (player != null) {
                showPlayer(player)
                res.status(200).send(player)
            }
        })
    },

    updatePlayer: function(req, res) {
        Player.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, player) {
            if (err) {
                console.log('\x1b[33mPlayer ' + req.params.id + ' Not Found\x1b[0m\n')
                res.status(404).send('404 - Player Not Found')
                return err
            }
            if (player != null) {
                res.send('Player udpated.');
            }
        });
    },

    deletePlayer: function(req, res) {
        Player.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                console.log('\x1b[33mPlayer ' + req.params.id + ' Not Found\x1b[0m\n')
                res.status(404).send('404 - Player Not Found')
                return err
            }
            res.status(200).send('Deleted successfully!');
        })
    }
}