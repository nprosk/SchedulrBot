const { Schema, model } = require('mongoose');

const matchesSchema = new Schema({
  week: { type: Number, required: true },
  role1: { type: String, required: true },
  role2: { type: String, required: true },
  status: { type: String, required: false, default: 'pending' },
  server: { type: String, required: true },
});

module.exports = model('Matches', matchesSchema);