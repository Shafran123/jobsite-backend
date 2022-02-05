const { companyAdminRegValidation } = require("../../validation/copmany_admin.validation")
const CompnayAdmins = require('../../models/admin.model')
const bycrpt = require('bcryptjs')

exports.registerAsCompanyAdmin = async (req, res) => {

    console.log(req.body);

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

        res.status(200).send({ success: 'true', registeredCompanyAdmin, message: 'Admin Registration Sucessfull' })
    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }
 

}