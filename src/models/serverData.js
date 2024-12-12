const { Schema, model } = require('mongoose');

const serverDataSchema = new Schema({
  server: { type: String, required: true , unique: true},
  currentWeek: { type: Number, default: null},
  startupMessage: { type: String, default: null},
});

module.exports = model('ServerData', serverDataSchema);