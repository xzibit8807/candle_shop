const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();


router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ name, email, password: hashed });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (e) { res.status(400).json({ message: e.message }); }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid creds' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Invalid creds' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});


module.exports = router;