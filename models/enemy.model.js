const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PotionSchema = new Schema({
    name: { type: String },
    power: { type: Number },
    number: { type: Number }
})

let EnemySchema = new Schema({
    name: { type: String, required: false, max: 100 },
    health_points: { type: Number, required: true },
    equipment: {
        experience: { type: Number },
        potions: { type: [PotionSchema] }
    }
});

// Export Enemy model
module.exports = mongoose.model('Enemy', EnemySchema);