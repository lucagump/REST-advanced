const Encounter = require('../models/encounter.model');
const Player = require('../models/player.model');
const Enemy = require('../models/enemy.model');

function showDocument(document) {
    console.log(document)
    console.log('\n')
}

//heal problem with insert in players
async function updateDbEncounter(encounter) {
    Encounter.findByIdAndUpdate(encounter._id, { $set: encounter }, function(err, encounter) {
        if (err) return err;
        console.log('\x1b[33mSaving Encounter\x1b[0m')
    });
}

async function updateDbPlayer(player) {
    Player.findByIdAndUpdate(player._id, { $set: player }, function(err, player) {
        if (err) return err;
        console.log('\x1b[33mSaving Player\x1b[0m')
    })
}

async function findEnemyById(id) {
    var enemy = await Enemy.findById(id)
    return enemy
}

async function findPlayerById(id) {
    var player = await Player.findById(id)
    console.log('\x1b[33mPlayer Found\x1b[0m')
    return player
}

async function findEncounterById(id) {
    var encounter = await Encounter.findById(id)
    return encounter
}

async function findRandomEnemy() {
    //Enemy.aggregate([{ $match: { health_points: { $lte: 121 } } }, { $sample: { size: 1 } }], function(err, enemy) {
    var enemy = await Enemy.aggregate([{ $sample: { size: 1 } }])
    if (enemy.length > 0) {
        console.log('\x1b[33mEnemy Found\x1b[0m')
        return enemy[0]
    } else {
        console.log('\x1b[33mEnemy NOT Found\x1b[0m')
        return null
    }
}

module.exports = {
    createEncounter: async function(req, res) {
        var player_hp, enemy_hp, enemy_id
        var player = await findPlayerById(req.body.player_id)

        if (player == null) {
            console.log('\x1b[33mPlayer ' + req.params.id + ' Not Found\x1b[0m\n')
            res.status(404).send('404 - Player Not Found')
        } else {
            player_hp = player.health_points

            var enemy = await findRandomEnemy()

            if (enemy == null) {
                console.log('\x1b[33mEnemy Not Found\x1b[0m\n')
                res.status(404).send('404 - Enemy Not Found')
            } else {
                if (enemy != null) {
                    enemy_id = enemy._id
                    enemy_hp = enemy.health_points
                }

                let encounter = new Encounter({
                    player_id: req.body.player_id,
                    enemy_id: enemy_id,
                    player_hp: player_hp,
                    enemy_hp: enemy_hp,
                    fight: true
                })
                encounter.save(function(err) {
                    if (err) {
                        res.status(500).send('500 - Internal Error')
                        return err
                    }
                    console.log('\x1b[31mEncounter Created\x1b[0m\n')
                    showDocument(encounter)
                    res.status(201).send(encounter)
                })
            }
        }
    },

    getEncounter: function(req, res) {
        Encounter.findById(req.params.id, function(err, encounter) {
            if (err) {
                console.log('\x1b[33mEncounter ' + req.params.id + ' Not Found\x1b[0m\n')
                res.status(404).send('404 - Encounter Not Found')
                return err
            }
            if (encounter != null) {
                showEncounter(encounter);
                res.status(201).send(encounter);
            }
        })
    },
    updateEncounter: function(req, res) {
        Encounter.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, encounter) {
            if (err) {
                console.log('\x1b[33mEncounter ' + req.params.id + ' Not Found\x1b[0m\n')
                res.status(404).send('404 - Encounter Not Found')
                return err;
            }
            if (encounter != null) {
                res.status(201).send('Encounter udpated.');
            }
        });
    },
    actionEncounter: async function(req, res) {
        var encounter = await findEncounterById(req.params.id)
        var player = await findPlayerById(encounter.player_id)
        if ((encounter == null) || (player == null)) {
            res.status(500).send('500 - Internal Error')
        } else {
            switch (req.body.action) {
                case 'attack':
                    {
                        var enemy = await findEnemyById(encounter.enemy_id)
                        encounter.enemy_hp -= player.attack
                        if (encounter.enemy_hp <= 0) {
                            encounter.enemy_hp = 0
                            encounter.fight = false
                            player.experience += enemy.equipment.experience
                            player.equipment.potions[0].number += enemy.equipment.potions[0].number
                            await updateDbPlayer(player)
                            res.status(201).send('You Win!!!')
                        } else {
                            res.status(201).send(encounter)
                        }
                        await updateDbEncounter(encounter)
                        console.log(encounter)
                        break;
                    }
                case 'heal':
                    {
                        //probabilmente sta funzione va messa in async 
                        if (player.equipment.potions[0].number > 0) {
                            encounter.player_hp += player.equipment.potions[0].power
                            player.equipment.potions[0].number -= 1
                            await updateDbPlayer(player)
                            await updateDbEncounter(encounter)

                            res.status(201).send(encounter)
                        } else {
                            res.status(201).send('No more potions for you')
                        }
                        break;
                    }
                default:
                    {
                        console.log('Encounter Parameters: 400 - Bad Request')
                        res.status(400).send('400 - Bad Request')
                    }
            }
        }
    },
    deleteEncounter: function(req, res) {
        Encounter.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.status(404).send('404 - Encounter Not Found')
                return err
            }
            console.log('\x1b[31mEncounter Deleted\x1b[0m')
            res.send('encounter deleted');
        })
    },
}