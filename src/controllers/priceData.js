const PriceData = require("../models/priceData");
const Currency = require("../models/currency");

// * create Data

const createPrice = async (currency, date, price) => {
  const doc = await new PriceData({ currency, date, price }).save();
  await Currency.updateOne(
    { _id: currency },
    { $set: { currentPrice: price } },
    { upsert: true }
  ).exec();
  return doc;
};

// * Get Data of currency

const getCurrencyData = async (currency) => {
  const doc = await PriceData.find({ currency }).exec();
  return doc;
};

module.exports = {
  createPrice,
  getCurrencyData,
};
