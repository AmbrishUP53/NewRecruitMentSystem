const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String, // for demo, plain text; in real app, use hashing
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
