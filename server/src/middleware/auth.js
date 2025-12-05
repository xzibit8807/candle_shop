const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: 'No token' });
    const token = header.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(payload.id).select('-password');
        next();
    } catch (e) { res.status(401).json({ message: 'Invalid token' }); }
};


const adminOnly = (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'No user' });
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
    next();
};


module.exports = { auth, adminOnly };