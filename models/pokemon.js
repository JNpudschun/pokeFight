const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  name: String,
  wins: Number,
  losses: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Pokemon", pokemonSchema);