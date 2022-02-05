const { userRegistrationValidation, userSkillValidation, userWorkExplValidation, userEducationValidation, userCV_Validation, userCV_Body_Validation, jobApplicaitonValidation } = require("../../validation/user.validation")

const Users = require('../../models/user.model')
const User_Exp = require('../../models/user_experience.model')
const User_Skill = require('../../models/user_skill.model')
const User_Education = require('../../models/user_education.model')
const User_Cv = require('../../models/user_cv.model')
const Job = require('../../models/job.model')
const Compnay = require('../../models/admin.model')
const CompnayDetials = require('../../models/company_details.model')
const JobApplication = require('../../models/job_applications.model')

const bycrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multer = require("multer");
const req = require("express/lib/request")
const upload = multer()
const { ObjectId } = require("mongodb")



exports.registerAsUser = async (req, res) => {
    //Validation
    const { error } = userRegistrationValidation(req.body)


    if (error) {
        return (
            res.status(400).send({
                code: 400,
                error: {
                    "status": "Bad reaquest",
                    "message": error.details[0].message
                }
            })
        )
    }

    //check user exist
    const emailCheck = await Users.findOne({ email: req.body.email })

    if (emailCheck) {
        return (
            res.status(400).send({
                code: 400,
                error: {
                    "status": "Bad reaquest",
                    "message": 'Email Already Exixts'
                }
            })
        )
    }

    //Hash the password
    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(req.body.password, salt)

    const user = new Users({
        name: req.body.name,
        contact_no: req.body.contact_no,
        email: req.body.email,
        password: hashedPassword
    });

    console.log('user', user)

    try {
        const registeredUser = await user.save();

        res.status(200).send({ success: 'true', registeredUser, message: 'User Registration Sucessfull' })
    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }

}


exports.addUserWorkExperince = async (req, res) => {
    //Validation
    const { error } = userSkillValidation(req.body)

    if (error) {
        return (
            res.status(400).send({
                code: 400,
                error: {
                    "status": "Bad reaquest",
                    "message": error.details[0].message
                }
            })
        )
    }


    const user_exp = new User_Exp({
        user_id: req.body.user_id,
        job_title: req.body.job_title,
        company: req.body.company,
        industry: req.body.industry,
        date_started: req.body.date_started,
        date_ended: req.body.date_ended,
        is_present: req.body.is_present
    });


    console.log('user_exp', user_exp)

    try {
        const addedUserExp = await user_exp.save();

        res.status(200).send({ success: 'true', addedUserExp, message: 'User Experice Added Sucessfull' })
    } catch (err) {
        res.status(500).send({ status: 500, message: err })
    }


}


exports.addUserSkill = async (req, res) => {
    //Validation
    const { error } = userSkillValidation(req.body)

    if (error) {
        return (
            res.status(400).send({
                code: 400,
                error: {
                    "status": "Bad reaquest",
                    "message": error.details[0].message
                }
            })
        )
    }


    const user_skill = new User_Skill({
        user_id: req.body.user_id,
        skill_name: req.body.skill_name,
    });


    console.log('user_skill', user_skill)

    try {
        const addedUserSkill = await user_skill.save();

        res.status(200).send({ success: 'true', addedUserSkill, message: 'User Skill Added Sucessfull' })
    } catch (err) {
        res.status(500).send({ status: 500, message: err })
    }


}


exports.addUserEducation = async (req, res) => {
    //Validation
    const { error } = userEducationValidation(req.body)

    if (error) {
        return (
            res.status(400).send({
                code: 400,
                error: {
                    "status": "Bad reaquest",
                    "message": error.details[0].message
                }
            })
        )
    }


    const user_education = new User_Education({
        user_id: req.body.user_id,
        edu_level: req.body.edu_level,
        edu_feild: req.body.edu_feild,
        school: req.body.school,
        date_started: req.body.date_started,
        date_ended: req.body.date_ended,
        is_present: req.body.is_present
    });

    console.log('user_education', user_education)

    try {
        const addedUserEducation = await user_education.save();

        res.status(200).send({ success: 'true', addedUserEducation, message: 'User Education Details Added Sucessfull' })
    } catch (err) {
        res.status(500).send({ status: 500, message: err })
    }


}

exports.uploadUserCv = async (req, res) => {
    //console.log(req.file, req.body)

    const { error_file } = userCV_Validation(req.file)
    const { error_body } = userCV_Body_Validation(req.body)

    console.log(error_file, error_body);

    if (error_file?.error?.details) {
        return (
            res.status(400).send({
                code: 400,
                error: {
                    "status": "Bad reaquest",
                    "message": error_file.error.details[0].message
                }
            })
        )
    }

    if (error_body?.error?.details) {
        return (
            res.status(400).send({
                code: 400,
                error: {
                    "status": "Bad reaquest",
                    "message": error_body.error?.details[0].message
                }
            })
        )
    }

    const params = {
        Bucket: BUCKET_NAME,
        Key: req.file.originalname, // File name you want to save as in S3
        Body: req.file.buffer
    };


    try {
        const stored = await s3.upload(params).promise()
        //console.log(stored);

        const user_cv = new User_Cv({
            user_id: req.body.user_id,
            user_cv: stored.Location
        });

        try {
            //CV Check
            const cvCheck = await User_Cv.findOne({ user_id: req.body.user_id })

            if (cvCheck) {
                console.log('update cv');

                cvCheck.user_cv = stored.Location
                const uploaded_user_cv = await cvCheck.save();
                res.status(200).send({ success: 'true', uploaded_user_cv, message: 'User CV File Updated successfully' })
            } else {

                const uploaded_user_cv = await user_cv.save();
                res.status(200).send({ success: 'true', uploaded_user_cv, message: 'User CV File uploaded successfully' })
            }

        } catch (err) {
            res.status(500).send({ status: 500, message: err })
        }

    } catch (err) {
        res.status(500).send({
            code: 500,
            error: {
                "status": "Internal Server Error",
                "message": err
            }
        })
    }

}


exports.getAllJobs = async (req, res) => {

    // const jobList = await Job.find({ is_accepting: true })

   // console.log(Compnay.collection.name);

    try {
        const jobList = await Job.aggregate([
            {
                $lookup: {
                    from: CompnayDetials.collection.name,
                    localField: 'company_id',
                    foreignField: 'company_id',
                    as: 'company_detials',
                },
                
            },
            {
                $unwind:
                  {
                    path: '$company_details',
                    includeArrayIndex: '0',
                    preserveNullAndEmptyArrays : true
                  }
              }
        ]).exec()
        console.log(jobList, 'jobList');

        res.status(200).send({ success: 'true', data:jobList, message: 'Job List Fetch Sucessfully' })

    }catch  (err) {

        res.status(500).send({ status: 500, message: err })
    }
 

}


exports.applyJobByJobId = async (req, res) => {

     //Validation
     const { error } = jobApplicaitonValidation(req.body)

     if (error) {
        return (
            res.status(400).send({
                code: 400,
                error: {
                    "status": "Bad reaquest",
                    "message": error.details[0].message
                }
            })
        )
    }

      //check job applicaiton exist
      const applicaitonCheck = await JobApplication.findOne({ job_id: req.body.job_id , user_id : req.body.user_id })

      if (applicaitonCheck) {
          return (
              res.status(400).send({
                  code: 400,
                  error: {
                      "status": "Bad reaquest",
                      "message": 'Application Already Exixts'
                  }
              })
          )
      }
  

    const job_application = new JobApplication({
        user_id: ObjectId(req.body.user_id),
        job_id : ObjectId(req.body.job_id)
    });

    console.log('job_application', job_application)

    try {
        const job = await Job.findOne({ _id : req.body.job_id})
        console.log('job', job)

        job.applicant_count = job.applicant_count + 1

        const appliedJob = await job_application.save();

        const updateApplyCount = await job.save();

        res.status(200).send({ success: 'true', appliedJob, message: 'Job Applied Sucessfull' })
    } catch (err) {
        res.status(500).send({ status: 500, message: err })
    }



}