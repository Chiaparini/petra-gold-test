const mongoose = require('mongoose');
const knightSchemaModel = require('./knightSchema');

const Schema = mongoose.Schema;

const HeroesSchema = new Schema(knightSchemaModel);

const Heroes = mongoose.model('Heroes', HeroesSchema);

module.exports = Heroes;