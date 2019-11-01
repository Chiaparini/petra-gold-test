const mongoose = require('mongoose');
const knightSchemaModel = require('./knightSchema');

const Schema = mongoose.Schema;

const KnightSchema = new Schema(knightSchemaModel);

const Knight = mongoose.model('Knight', KnightSchema);

module.exports = Knight;