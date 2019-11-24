const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PotionSchema = new Schema({
    name: { type: String },
    power: { type: Number },
    number: { type: Number }
})

let WeaponSchema = new Schema({
    weapon: { type: String, required: false },
    attack: { type: Number, required: false }
})

let PlayerSchema = new Schema({
    name: { type: String, required: false, max: 100 },
    level: { type: Number, required: true },
    health_points: { type: Number, required: true },
    experience: { type: Number, required: true },
    attack: { type: Number, required: true },
    equipment: {
        potions: { type: [PotionSchema] },
        weapon: { type: [WeaponSchema] }
    }
});

// Export Player model
module.exports = mongoose.model('Player', PlayerSchema);