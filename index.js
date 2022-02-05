var express = require('express');
var cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
var app = express();
const userRoute = require('./routes/user/user.router');
const companyAdminRoute = require('./routes/admin/company_admin.router');
const { environment } = require('./environments/environment');
const AWS = require('aws-sdk');

// Enter copied or downloaded access ID and secret key here
ID = 'AKIAWILLR4T5AUTWMHLI';
SECRET = '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';

// The name of the bucket that you have created
BUCKET_NAME = 'jobmart/user_cv';

s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

//balance = process.env.BALANCE
const port = process.env.PORT || 2400

dotenv.config();

//DB Connection
mongoose.connect(process.env.mongo_db,
    { useNewUrlParser: true }, () =>
    console.log('connected to DB')
); 

app.use(express.json());
app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Pass to next layer of middleware
    next();
})

app.use('/api/v1/user', userRoute)
app.use('/api/v1/admin', companyAdminRoute)

app.listen(port, function () {
    console.log(`JobSite listening on port ${port}!`);
});