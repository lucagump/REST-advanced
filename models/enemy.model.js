const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EnemySchema = new Schema({
    name: { type: String, required: false, max: 100 },
    health_points: { type: Number, required: true },
    equipment: { type: String, required: true },
    reward: {
        experience: { type: Number },
        hp: { type: Number }
    }
});

// Export Enemy model
module.exports = mongoose.model('Enemy', EnemySchema);