const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
    name: { 
        type: String, 
        required: true 
    },
    nickname: { 
        type: String, 
        required: true 
    },
    birthday: { 
        type: Date 
    },
    weapons: [{
        type: Schema.Types.ObjectId, 
        ref: 'Weapon'
    }],
    attributes: { 
        strength: { 
            type: Number, 
            required: true,
            default: 0
        }, 
        dexterity: { 
            type: Number, 
            required: true,
            default: 0
        }, 
        constitution: { 
            type: Number, 
            required: true,
            default: 0
        }, 
        intelligence: { 
            type: Number, 
            required: true,
            default: 0
        }, 
        wisdom: { 
            type: Number, 
            required: true,
            default: 0
        }, 
        charisma: { 
            type: Number, 
            required: true,
            default: 0
        }
    },
    keyAttribute: { 
        type: String, 
        required: true 
    }
};