const mongoose = require("mongoose");

const currencySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },

  symbol: { type: String },

  type: { type: String, enum: ["btc", "eth"] },

  currentPrice: { type: Number },
});

const Currency = mongoose.model("currency", currencySchema);

module.exports = Currency;
