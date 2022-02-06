const { userDetailsValidation } = require("../../validation/user.validation")
const Users = require('../../models/user.model')
const User_Exp = require('../../models/user_experience.model')
const User_Skill = require('../../models/user_skill.model')
const User_Education = require('../../models/user_education.model')
const User_Cv = require('../../models/user_cv.model')
const JobApplication = require('../../models/job_applications.model')
const { ObjectId } = require("mongodb")

exports.getUserBasicDetails = async (req, res) => {

    var user_id = req.query.user_id
    //Validation
    const { error } = userDetailsValidation(req.query)

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

    try {

        const user = await Users.findOne({ _id: user_id }).select("-password")
        const user_exp = await User_Exp.find({ user_id: user_id }).select("-user_id")
        const user_skill = await User_Skill.find({ user_id: user_id }).select("-user_id")
        const user_education = await User_Education.find({ user_id: user_id }).select("-user_id")
        const user_cv = await User_Cv.findOne({ user_id: user_id }).select("-user_id")

        let user_data = {
            user_basic: user,
            user_exp: user_exp,
            user_skill: user_skill,
            user_education: user_education,
            user_cv: user_cv,
           
        }
        //console.log(user, 'usr');

        res.status(200).send({ success: 'true', user_data, message: 'User Details Fetched Sucessfull' })
    } catch (err) {
        res.status(500).send({ status: 500, message: err })
    }

}

exports.getUserAppliedJobs = async (req, res) => {

    var user_id = req.query.user_id
    //Validation
    const { error } = userDetailsValidation(req.query)

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

    try {

        const user_applied_jobs = await Users.aggregate([
            {
                $match: {
                    _id: ObjectId(user_id),
                }
            },
             {
                $unwind:
                  {
                    path: '$user_applied_jobs',
                    includeArrayIndex: '0',
                    preserveNullAndEmptyArrays : true
                  }
              },
            {
                $lookup: {
                    from: JobApplication.collection.name,
                    localField: '_id',
                    foreignField: 'user_id',
                    as: 'user_applied_jobs',
                },

            },
            {
                $project: {
                    "user_applied_jobs": 1,
                }
            }

        ])

        res.status(200).send({ success: 'true', user_applied_jobs, message: 'User Appleid Jobs Fetched Sucessfull' })

    }
    catch (err) {
        res.status(500).send({ status: 500, message: err })
    }
}