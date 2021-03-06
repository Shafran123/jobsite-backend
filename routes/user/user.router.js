const router = require('express').Router();
const userController = require('../../controller/user/user.controller')
const userDetailsController = require('../../controller/user/user_details.controller')
const multer = require("multer");
const upload = multer()

//Middleware
const is_auth = require('../../middleware/is_auth')


router.post('/register-user' , userController.registerAsUser)
router.post('/login-user' , userController.loginAsUser)
router.post('/add-user-work-exp' , userController.addUserWorkExperince)
router.post('/add-user-skill' , userController.addUserSkill)
router.post('/add-user-education' , userController.addUserEducation)
router.post('/upload-user-cv' , upload.single('uploaded_file') , userController.uploadUserCv)
router.post('/apply-job' ,  userController.applyJobByJobId)

router.get('/get-all-jobs' , userController.getAllJobs)

router.get('/get-user-basic-details' , userDetailsController.getUserBasicDetails)

router.get('/get-user-applied-jobs' , userDetailsController.getUserAppliedJobs)

module.exports = router