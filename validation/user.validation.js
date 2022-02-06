const Joi = require('@hapi/joi')

const options = {
    errors: {
      wrap: {
        label: ''
      }
    }
  };

const userRegistrationValidation = (data) => {
    const schema = Joi.object(
        {

            name: Joi.string().min(6).required(),
            contact_no: Joi.string().required(),
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).required()

        }
    )

    return schema.validate(data)

}

const userLoginValidation = (data) => {
    const schema = Joi.object(
        {
            email: Joi.string().required().email(),
            password: Joi.string().required()

        }
    )

    return schema.validate(data)

}

const userDetailsValidation = (data) => {
    const schema = Joi.object(
        {
            user_id: Joi.required(),
        }
    )

    return schema.validate(data)

}


const userWorkExplValidation = (data) => {
    const schema = Joi.object({
        user_id: Joi.required(),
        job_title: Joi.string().required(),
        company: Joi.string().required(),
        industry: Joi.string().required(),
        date_started: Joi.date().required(),
        date_ended: Joi.date(),
        is_present: Joi.bool().required()
    })

    return schema.validate(data)
}


const userSkillValidation = (data) => {
    const schema = Joi.object({
        user_id: Joi.required(),
        skill_name: Joi.required()
    })

    return schema.validate(data)
}

const userEducationValidation = (data) => {
    const schema = Joi.object({
        user_id: Joi.required(),
        edu_level: Joi.string().required(),
        edu_feild: Joi.string().required(),
        school: Joi.string().required(),
        date_started: Joi.date().required(),
        date_ended: Joi.date(),
        is_present: Joi.bool().required()
    })

    return schema.validate(data)
}


const userCV_Validation = (data) => {

    let temp_obj = {
        mimetype : data.mimetype
    }
    

    const schema_file = Joi.object({
        mimetype: Joi.string().valid('application/pdf')
    })

    return ({
        error_file: schema_file.validate(temp_obj , options)
    }) 

}

const userCV_Body_Validation = (data) => {

    const schema_body = Joi.object({
        user_id: Joi.required(),
    })

    return ({
        error_body: schema_body.validate(data , options) 
    }) 


}

const jobApplicaitonValidation = (data) => {
    
    const schema = Joi.object({
        user_id: Joi.required(),
        job_id: Joi.required()
    })

    return schema.validate(data)
}



module.exports.userRegistrationValidation = userRegistrationValidation
module.exports.userLoginValidation = userLoginValidation
module.exports.userWorkExplValidation = userWorkExplValidation
module.exports.userSkillValidation = userSkillValidation
module.exports.userEducationValidation = userEducationValidation
module.exports.userCV_Validation = userCV_Validation
module.exports.userCV_Body_Validation = userCV_Body_Validation
module.exports.jobApplicaitonValidation = jobApplicaitonValidation
module.exports.userDetailsValidation = userDetailsValidation
