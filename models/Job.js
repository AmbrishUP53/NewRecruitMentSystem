const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    salary: String,
    postedBy: String // or reference to User in real apps
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
