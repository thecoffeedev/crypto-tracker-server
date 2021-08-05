var express = require("express");
var router = express.Router();

const {
  addCurrency,
  getCurrencies,
  getCurrency,
  currentPrice,
} = require("../controllers/currency");

const { createPrice, getCurrencyData } = require("../controllers/priceData");

/* GET home page. */
router.get("/currencies/all", async (req, res) => {
  try {
    const currencies = await getCurrencies();
    res.status(200).send(currencies);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/currencies/create", async (req, res) => {
  try {
    const { name, symbol, type } = req.body;
    await addCurrency(name, symbol, type);
    res.status(200).json({ message: "Currency is added" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/currency/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const currency = await getCurrency(id);
    res.status(200).json(currency);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/currency/price/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const price = await currentPrice(id);
    res.status(200).send(price);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/currency/add-price", async (req, res) => {
  try {
    const { currency, date, price } = req.body;
    const created = await createPrice(currency, date, price);
    res.status(200).json({ mesesage: "price is added", created });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/currency/data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getCurrencyData(id);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
