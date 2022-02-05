const Joi = require('@hapi/joi')

const options = {
    errors: {
      wrap: {
        label: ''
      }
    }
  };

const companyAdminRegValidation = (data) => {
    const schema = Joi.object(
        {
            company_name: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().min(6).required(),
            country: Joi.string().required(),
            industry: Joi.string().required(),
        }
    )

    return schema.validate(data , options)
}

const JobValidation = (data) => {
  const schema = Joi.object(
      {
          company_id: Joi.string().required(),
          job_title: Joi.string().required(),
          job_description : Joi.string().required(),
          is_accepting : Joi.bool()

      }
  )

  return schema.validate(data , options)
}

module.exports.companyAdminRegValidation = companyAdminRegValidation
module.exports.JobValidation = JobValidation