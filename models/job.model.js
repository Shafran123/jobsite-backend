const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')


const jobSchema = new mongoose.Schema({

    company_id: {
         type : ObjectId,
         required: true,
    },
    job_title:{
        type : String,
        required: true,
    },
    job_description: {
        type : String,
        required: true,
    },
    applicant_count:{
        type : Number,
        default : 0
    },
    is_accepting:{
        type : Boolean,
        required: true,
    },
    created_date:{
        type: Date,
    },
    updated_date:{
        type: Date,
        default :Date.now
    }
});


module.exports = mongoose.model('jobs' , jobSchema)