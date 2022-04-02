const router = require('express').Router();

const Product = require('../models/product.models');

router.get('/', async (req, res) => {
  try {
    const products = Product.find().lean().exec();
    return res.status(201).send(products);
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const product = Product.create(req.body);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const product = Product.findById(req.params.id);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const product = Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const product = Product.findByIdAndDelete(req.params.id);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
});

module.exports = router;