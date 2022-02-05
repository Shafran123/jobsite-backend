const mongoose = require('mongoose')


const adminSchema = new mongoose.Schema({

    company_name: {
         type : String,
         required: true,
    },
    email:{
        type : String,
        required: true,
    },
    password :{
        type : String,
        required: true,
        max : 1024,
        min : 6
    },
    country: {
        type : String,
        required: true,
    },
    industry:{
        type : String,
        required: true,
    },
    created_date:{
        type: Date,
        default :Date.now
    },
});


module.exports = mongoose.model('company_admins' , adminSchema)