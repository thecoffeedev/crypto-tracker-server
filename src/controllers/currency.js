const Currency = require("../models/currency");

const addCurrency = async (name, symbol, type) => {
  const doc = await new Currency({ name, symbol, type }).save();
  return doc;
};

const getCurrencies = async () => {
  const doc = await Currency.find().lean().exec();
  return doc;
};

const getCurrency = async (_id) => {
  const doc = await Currency.findOne({ _id }).exec();
  return doc;
};

const currentPrice = async (_id) => {
  const doc = await Currency.findOne(
    { _id },
    { currentPrice: 1, _id: 0 }
  ).exec();
  return doc;
};

module.exports = {
  addCurrency,
  getCurrencies,
  getCurrency,
  currentPrice,
};
