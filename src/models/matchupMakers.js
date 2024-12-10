const { Schema, model } = require('mongoose');

const matchupMakersSchema = new Schema({
  week: { type: Number, default: null},
  team1: { type: String, default: null},
  team2: { type: String, default: null},
  server: { type: String, required: true , unique: true},
});

module.exports = model('MatchupMakers', matchupMakersSchema);