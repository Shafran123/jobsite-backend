const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

    name: {
         type : String,
         required: true,
         min : 6,
         max :255
    },
    contact_no:{
        type : String,
        required: true,
    },
    email:{
        type : String,
        required: true,
        max : 255,
        min : 2
    },
    password :{
        type : String,
        required: true,
        max : 1024,
        min : 6
    },
    work_exp: {
        type: Array
    },
    created_date:{
        type: Date,
        default :Date.now
    }
});


module.exports = mongoose.model('users' , userSchema)