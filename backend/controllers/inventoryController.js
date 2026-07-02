const Inventory = require('../models/Inventory');
const {
  addActivity
} = require('./activityController');

// Add Product
exports.addProduct = async (req, res) => {

  try {

    const product =
      await Inventory.create(req.body);
await addActivity(
  `Product ${product.productName} added`,
  'inventory'
);
    res.status(201).json({
      message: 'Product Added',
      product
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// Get Products
exports.getProducts = async (req, res) => {

  try {

    const products =
      await Inventory.find();

    res.status(200).json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};