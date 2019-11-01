const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WeaponSchema = new Schema({
    knight_id: {
        type: Schema.Types.ObjectId,
        ref: 'Knight'
    },
    name: { 
        type: String, 
        required: true, 
        max: 100 
    },
    mod: { 
        type: Number, 
        required: true 
    },
    attr: { 
        type: String, 
        required: true 
    },
    equipped: {
        type: Boolean,
        default: false
    }
})

const Weapon = mongoose.model('Weapon', WeaponSchema);

module.exports = Weapon;