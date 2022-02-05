const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')


const jobApplicaitonSchema = new mongoose.Schema({
    user_id: {
        type: ObjectId,
        required: true,
    },
    job_id: {
        type: ObjectId,
        required: true,
    },
    date_applied: {
        type: Date,
        default: Date.now
    },
});


module.exports = mongoose.model('job_applications', jobApplicaitonSchema)