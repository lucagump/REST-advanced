const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EncounterSchema = new Schema({
    player_id: { type: String, required: false },
    enemy_id: { type: String, required: false },
    player_hp: { type: Number, required: false },
    enemy_hp: { type: Number, required: false },
    fight: { type: Boolean, required: true },
});

// Export Encounter model
module.exports = mongoose.model('Encounter', EncounterSchema);