const express = require('express');

const connectDB = require('./configs/db');
const productController = require('./controllers/product.controllers');
const app = express();
const PORT = 8000;

app.use(express.json());
app.use('/products', productController);

connectDB();

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});