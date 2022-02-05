const mongoose = require('mongoose')


const userEducationSchema = new mongoose.Schema({

    user_id: {
         type : String,
         required: true,
    },
    edu_level:{
        type : String,
        required: true,
    },
    edu_feild:{
        type : String,
        required: true,
    },
    school:{
        type : String,
        required: true,
    },
    date_started:{
        type: Date,
        required: true,
    },
    date_ended:{
        type: Date,
    },
    is_present:{
        type : String,
        required: true,
    },

});


module.exports = mongoose.model('user_educations' , userEducationSchema)