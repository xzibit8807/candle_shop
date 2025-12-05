const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    images: [String], // filenames or URLs
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
module.exports = mongoose.model('Product', productSchema);