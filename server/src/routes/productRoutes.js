const express = require('express');
const Product = require('../models/Product');
const upload = require('../middleware/upload');
const { auth, adminOnly } = require('../middleware/auth');
const router = express.Router();


router.get("/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
});



// admin: add product with multiple images
router.post('/', auth, adminOnly, upload.array('images', 6), async (req, res) => {
    const { title, description, price } = req.body;
    const images = req.files.map(f => f.filename);
    const p = await Product.create({ title, description, price: Number(price || 0), images, createdBy: req.user._id });
    res.json(p);
});


router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        const updateData = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        };

        if (req.file) {
            updateData.image = "/uploads/" + req.file.filename;
        }

        const updated = await Product.findByIdAndUpdate(req.params.id, updateData, {
            new: true
        });

        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update product" });
    }
});


router.get('/:id', async (req, res) => {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({});
    res.json(p);
});


module.exports = router;