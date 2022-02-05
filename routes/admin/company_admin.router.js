const router = require('express').Router();
const companyAdminController = require('../../controller/admin/company_admin.controller')
const multer = require("multer");
const upload = multer()

//Middleware
const is_auth = require('../../middleware/is_auth')


router.post('/register-company-admin' , companyAdminController.registerAsCompanyAdmin)

module.exports = router