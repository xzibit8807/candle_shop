const express = require('express');
const Order = require('../models/Order');
const { auth } = require('../middleware/auth');
const router = express.Router();


router.post('/', auth, async (req, res) => {
    const { items, total } = req.body;
    const order = await Order.create({ user: req.user._id, items, total });
    res.json(order);
});


router.get('/my', auth, async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).populate('items.product');
    res.json(orders);
});


module.exports = router;