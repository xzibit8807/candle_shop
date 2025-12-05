const express = require('express');
const Product = require('../models/Product');
const upload = require('../middleware/upload');
const { auth, adminOnly } = require('../middleware/auth');
const router = express.Router();


router.get('/', async (req, res) => {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
});


// admin: add product with multiple images
router.post('/', auth, adminOnly, upload.array('images', 6), async (req, res) => {
    const { title, description, price } = req.body;
    const images = req.files.map(f => f.filename);
    const p = await Product.create({ title, description, price: Number(price || 0), images, createdBy: req.user._id });
    res.json(p);
});


router.get('/:id', async (req, res) => {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({});
    res.json(p);
});


module.exports = router;