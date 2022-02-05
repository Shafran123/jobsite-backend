const router = require('express').Router();
const companyAdminController = require('../../controller/admin/company_admin.controller')
const multer = require("multer");
const upload = multer()

//Middleware
const is_auth = require('../../middleware/is_auth')

//POST Routes
router.post('/register-company-admin' , companyAdminController.registerAsCompanyAdmin)
router.post('/create-job' , companyAdminController.createJob)

//PUT Routes
router.put('/edit-job' , companyAdminController.editJob)


//GET Routes
router.get('/get-jobs-by-company-id' , companyAdminController.getJobsByCompanyId)


module.exports = router