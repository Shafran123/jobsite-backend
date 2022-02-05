const mongoose = require('mongoose')


const userCvSchema = new mongoose.Schema({

    user_id: {
         type : String,
         required: true,
    },
    user_cv:{
        type : String,
        required: true,
    },

});


module.exports = mongoose.model('user_cv' , userCvSchema)