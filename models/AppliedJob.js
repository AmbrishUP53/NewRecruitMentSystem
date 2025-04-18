const mongoose = require('mongoose');

const appliedJobSchema = new mongoose.Schema({
    userId: String,        // or ObjectId ref to User
    jobId: String,         // or ObjectId ref to Job
    jobTitle: String,
    company: String,       // optional field
    description: String,
    location: String,
    salary: String
}, { timestamps: true });

module.exports = mongoose.model('AppliedJob', appliedJobSchema);
