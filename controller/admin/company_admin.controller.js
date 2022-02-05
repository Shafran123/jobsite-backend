const { companyAdminRegValidation, JobValidation } = require("../../validation/copmany_admin.validation")
const CompnayAdmins = require('../../models/admin.model')
const CompnayDetials = require('../../models/company_details.model')
const Job = require('../../models/job.model')
const bycrpt = require('bcryptjs')
const { ObjectId } = require("mongodb")
const { Mongoose } = require("mongoose")

exports.registerAsCompanyAdmin = async (req, res) => {

    // console.log(req.body);

    const { error } = companyAdminRegValidation(req.body)

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


    console.log('hello');

    //check user exist
    const emailCheck = await CompnayAdmins.findOne({ email: req.body.email })

    if (emailCheck) {
        return (
            res.status(400).send({
                code: 400,
                error: {
                    "status": "Bad reaquest",
                    "message": 'Company Email Already Exixts'
                }
            })
        )
    }

    //Hash the password
    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(req.body.password, salt)

    const compnay_admin = new CompnayAdmins({
        company_name: req.body.company_name,
        email: req.body.email,
        password: hashedPassword,
        country: req.body.country,
        industry: req.body.industry
    });

   

    // console.log('compnay_admin', compnay_admin)

    try {
        const registeredCompanyAdmin = await compnay_admin.save();

        const company_detials = new CompnayDetials({
            company_id : registeredCompanyAdmin._id,
            company_name: req.body.company_name,
            email: req.body.email,
            country: req.body.country,
            industry: req.body.industry
        })

        const saveCompanyDetils = await company_detials.save()

        res.status(200).send({ success: 'true' , saveCompanyDetils, message: 'Admin Registration Sucessfull' })
    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }


}

exports.createJob = async (req, res) => {


    const { error } = JobValidation(req.body)

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



    const job = new Job({
        company_id: req.body.company_id,
        job_title: req.body.job_title,
        job_description: req.body.job_description,
        is_accepting: req.body.is_accepting,
        created_date: Date.now()
    });

    // console.log('compnay_admin', compnay_admin)

    try {
        const addedJob = await job.save();

        res.status(200).send({ success: 'true', addedJob, message: 'Job Publsihed!' })
    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }


}


exports.editJob = async (req, res) => {

    const job_id = req.query.job_id

    console.log(req.query);

    const { error } = JobValidation(req.body)

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
        const getJob = await Job.findOneAndUpdate({ id: job_id }, req.body)

        res.status(200).send({ success: 'true' , message: 'Job Edited Sucessfully!' })
    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }
}


exports.getJobsByCompanyId = async (req, res) => {

    var company_id = req.query.company_id


    //console.log(mongoose.Types.ObjectId(company_id) , typeof company_id);

    try {

        //const company = await CompnayDetials.find({company_id : company_id})

        //console.log(company);
 
        const jobsByCompany = await Job.aggregate([
            {
                $match:{
                    company_id: ObjectId(company_id) ,
                }
            },
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

        console.log(jobsByCompany, 'jobsByCompany');

        res.status(200).send({ success: 'true', data:jobsByCompany, message: 'Job List Fetch Sucessfully' })

    }catch  (err) {

        res.status(500).send({ status: 500, message: err })
    }
 

}