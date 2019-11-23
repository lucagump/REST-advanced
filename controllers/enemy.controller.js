const Enemy = require('../models/enemy.model');

function showEnemy(document) {
    console.log('\x1b[43m\x1b[31mENEMY INFO:\x1b[0m')
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
    test: function() {
        console.log("ciao")
    },
    createEnemy: function(req, res) {
        let enemy = new Enemy({
            name: req.body.name,
            health_points: 100 + returnRandomInt(-20, 20),
            equipment: "Sword",
            reward: {
                experience: 10 + returnRandomInt(-3, 3),
                hp: 10 + returnRandomInt(-2, 2)
            }
        });

        enemy.save(function(err) {
            if (err) {
                return (err);
            }
            showEnemy(enemy)
            res.send(enemy)
                // .status(500)
        })
    },

    getEnemy: function(req, res) {
        console.log("ciao")
        Enemy.findById(req.params.id, function(err, enemy) {
            if (err) return next(err);
            showEnemy(enemy);
            res.send(enemy);
        })
    },

    updateEnemy: function(req, res) {
        Enemy.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, enemy) {
            if (err) return next(err);
            res.send('Enemy udpated.');
        });
    },
}