const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')


const companyDetialsSchema = new mongoose.Schema({
    company_id: {
        type: ObjectId,
        required: true,
    },
    company_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        default: Date.now
    },
});


module.exports = mongoose.model('company_details', companyDetialsSchema)