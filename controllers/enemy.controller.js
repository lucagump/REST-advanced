const Enemy = require('../models/enemy.model');

function showEnemy(document) {
    console.log('\x1b[43m\x1b[31mENEMY INFO:\x1b[0m')
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
    createEnemy: function(req, res) {
        if (checkName(req.body.name)) {
            let enemy = new Enemy({
                name: req.body.name,
                health_points: 100 + returnRandomInt(-20, 20),
                equipment: {
                    experience: 10 + returnRandomInt(-3, 3),
                    potions: [{
                        name: 'heal',
                        power: 10 + returnRandomInt(-2, 2),
                        number: 3
                    }]
                }
            });
            showEnemy(enemy);
            enemy.save(function(err) {
                if (err) {
                    res.status(500).send('500 - Internal Error')
                    return err
                }
                res.status(201).send(enemy)
                console.log('\x1b[33mEnemy ' + req.body.name + ' Created\x1b[0m\n')
            })
        } else {
            res.status(400).send('400 - Bad Request')
        }
    },

    getEnemy: function(req, res) {
        Enemy.findById(req.params.id, function(err, enemy) {
            if (err) {
                console.log('\x1b[33mEnemy ' + req.params.id + ' Not Found\x1b[0m\n')
                res.status(404).send('404 - Enemy Not Found')
                return err
            }
            if (enemy != null) {
                showEnemy(enemy)
                res.status(201).send(enemy)
            }
        })
    },

    updateEnemy: function(req, res) {
        Enemy.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, enemy) {
            if (err) {
                console.log('\x1b[33mEnemy ' + req.params.id + ' Not Found\x1b[0m\n')
                res.status(404).send('404 - Enemy Not Found')
                return err
            }
            if (enemy != null) {
                res.status(201).send('Enemy udpated.')
            }
        });
    },
    deleteEnemy: function(req, res) {
        Enemy.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                console.log('\x1b[33mEnemy ' + req.params.id + ' Not Found\x1b[0m\n')
                res.status(404).send('404 - Enemy Not Found')
                return err
            }
            res.status(200).send('Deleted successfully!')
        })
    }
}