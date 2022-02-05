const mongoose = require('mongoose')


const userSkillSchema = new mongoose.Schema({

    user_id: {
         type : String,
         required: true,
    },
    skill_name:{
        type : String,
        required: true,
    },

});


module.exports = mongoose.model('user_skill' , userSkillSchema)