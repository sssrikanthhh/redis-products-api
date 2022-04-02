const router = require('express').Router();
const { json } = require('express');
const client = require('../configs/redis');
const Product = require('../models/product.models');

router.get('/', async (req, res) => {
  try {
    client.get('products', async (err, ftcdPds) => {
      if (ftcdPds) {
        return res.status(201).send(JSON.parse(ftcdPds));
      } else {
        try {
          const products = await Product.find().lean().exec();
          client.set('products', JSON.stringify(products));
          return res.status(201).send(JSON.parse(ftcdPds));
        } catch (error) {
          return res.status(500).send({ err: err.message });
        }
      }
    });
    const products = await Product.find().lean().exec();
    return res.status(201).send(products);
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    const products = await Product.find().lean().exec();
    client.set('products', JSON.stringify(products));
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    client.get(`products.${req.params.id}`, async (err, ftchPd) => {
      if (ftchPd) {
        return res.status(201).send(JSON.parse(ftchPd));
      } else {
        try {
          let product = await Product.findById(req.params.id).lean().exec();

          client.set(`products.${req.params.id}`, JSON.stringify(product));
          return res.status(201).send();
        } catch (error) {
          return res.status(500).send({ err: err.message });
        }
      }
    });
    const product = await Product.findById(req.params.id);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    const products = await Product.find().lean().exec();
    client.set('products', JSON.stringify(products));
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    const products = await Product.find().lean().exec();
    client.set('products', JSON.stringify(products));
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
});

module.exports = router;