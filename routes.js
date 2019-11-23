// __________ ________   ____ _________________________
// \______   \\_____  \ |    |   \__    ___/\_   _____/
//  |       _/ /   |   \|    |   / |    |    |    __)_ 
//  |    |   \/    |    \    |  /  |    |    |        \
//  |____|_  /\_______  /______/   |____|   /_______  /
//         \/         \/                            \/ 
//
//   

const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('./controllers/product.controller');
const player_controller = require('./controllers/player.controller');
const enemy_controller = require('./controllers/enemy.controller');
const encounter_controller = require('./controllers/encounter.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test)
router.post('/products', product_controller.createProduct)
router.get('/products/:id', product_controller.getProduct)
router.put('/:id/update', product_controller.updateProduct)
router.delete('/:id/delete', product_controller.deleteProduct)

// Routes for RPG Game
router.post('/players/', player_controller.createPlayer)
router.get('/players/:id', player_controller.getPlayer)
router.post('/enemy', enemy_controller.createEnemy)
router.get('/enemy/:id', enemy_controller.getEnemy)
router.post('/encounters/', encounter_controller.createEncounter)
router.put('/encounters/', encounter_controller.actionEncounter)
router.delete('/encounters/:id', encounter_controller.deleteEncounter)

module.exports = router;