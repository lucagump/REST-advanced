const Encounter = require('../models/encounter.model');
const Player = require('../models/player.model');
const Enemy = require('../models/enemy.model');

function showDocument(document) {
    console.log(document)
    console.log('\n')
}

function updateDbEncounter(encounter) {
    Encounter.findByIdAndUpdate(encounter._id, { $set: encounter }, function(err, encounter) {
        if (err) return err;
    });
}

function updateDbPlayer(player) {
    Player.findByIdAndUpdate(player._id, { $set: player }, function(err, player) {
        if (err) return err;
        console.log("saving Player")
        console.log(player)
    })
}

module.exports = {
    createEncounter: function(req, res) {
        var player_hp, enemy_hp, enemy_id

        Player.findById(req.body.player_id, function(err, player) {
            if (err) return next(err);
            showDocument(player);
            player_hp = player.health_points
        })

        Enemy.aggregate([{ $match: { health_points: { $lte: 121 } } }, { $sample: { size: 1 } }], function(err, enemy) {
            if (err) return next(err);
            showDocument(enemy);
            enemy_id = enemy[0]._id
            enemy_hp = enemy[0].health_points
            done = true

            let encounter = new Encounter({
                player_id: req.body.player_id,
                enemy_id: enemy_id,
                player_hp: player_hp,
                enemy_hp: enemy_hp,
                fight: true
            })
            encounter.save(function(err) {
                if (err) {
                    return (err);
                }
                showDocument(encounter)
                res.send(encounter)
                    // .status(500)
            })
        })
    },

    getEncounter: function(req, res) {
        Encounter.findById(req.params.id, function(err, encounter) {
            if (err) return next(err);
            showEncounter(encounter);
            res.send(encounter);
        })
    },
    updateEncounter: function(req, res) {
        Encounter.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, encounter) {
            if (err) return next(err);
            res.send('Encounter udpated.');
        });
    },
    actionEncounter: function(req, res) {
        Encounter.aggregate([{ $match: { fight: true } }, { $sample: { size: 1 } }], function(err, encounter) {
            if (err) return next(err);
            if (encounter.length <= 0) {
                res.send("No Encounters Active")
                return
            }
            encounter = encounter[0]
            showDocument(encounter)
            if (req.body.action == "attack") {
                Player.findById(encounter.player_id, function(err, player) {
                    if (err) return next(err);
                    Enemy.findById(encounter.enemy_id, function(err, enemy) {
                        if (err) return next(err);
                        showDocument(player);
                        encounter.enemy_hp -= player.attack;
                        if (encounter.enemy_hp <= 0) {
                            encounter.enemy_hp = 0
                            encounter.fight = false
                            player.experience += enemy.reward.experience
                            player.player_hp += enemy.reward.hp

                            //win or damage to enemy
                            //update encounter in db and res
                            updateDbPlayer(player)
                            updateDbEncounter(encounter)
                            res.send("You Win!!!")
                        } else {
                            updateDbEncounter(encounter)
                            res.send(encounter)
                        }
                    })
                })
            }
            if (req.body.action == "heal") {
                Player.findById(encounter.player_id, function(err, player) {
                    if (err) return next(err);
                    showDocument(player);
                    if (player.potions.heal[0] > 0) {
                        encounter.player_hp += player.potions.heal[1];
                        player.potions.heal[0] -= 1
                        updateDbPlayer(player)
                            // update player.potions.heal[0] (numbers of potions)
                        updateDbEncounter(encounter)
                        res.send(encounter)
                    } else {
                        res.send(encounter)
                    }
                })
            }
        })
    },

    deleteEncounter: function(req, res) {
        Encounter.findByIdAndRemove(req.params.id, function(err) {
            if (err) return next(err);
            res.send("encounter deleted");
        })
    },
}