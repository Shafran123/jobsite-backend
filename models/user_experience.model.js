const mongoose = require('mongoose')


const userWorkExpSchema = new mongoose.Schema({

    user_id: {
         type : String,
         required: true,
    },
    job_title:{
        type : String,
        required: true,
    },
    company:{
        type : String,
        required: true,
    },
    industry :{
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
        type: Boolean,
        required: true,
    }

    // user_id : Joi.object().required(),
    //     job_title : Joi.string().required(),
    //     company : Joi.string().required(),
    //     industry :  Joi.string().required(),
    //     date_started: Joi.date().required(),
    //     date_ended : Joi.date(),
    //     is_present: Joi.bool().required()
});


module.exports = mongoose.model('user_work_experience' , userWorkExpSchema)