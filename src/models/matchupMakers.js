const { Schema, model } = require('mongoose');

const matchupMakersSchema = new Schema({
  week: { type: Number, required: true },
  team1: { type: String, required: true },
  team2: { type: String, required: true },
  server: { type: String, required: true },
});

module.exports = model('MatchupMakers', matchupMakersSchema);