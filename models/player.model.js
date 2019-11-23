const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PlayerSchema = new Schema({
    name: { type: String, required: false, max: 100 },
    level: { type: Number, required: true },
    health_points: { type: Number, required: true },
    experience: { type: Number, required: true },
    attack: { type: Number, required: true },
    potions: {
        heal: { type: Array },
        strength: { type: Array }
    }
});

// Export Player model
module.exports = mongoose.model('Player', PlayerSchema);