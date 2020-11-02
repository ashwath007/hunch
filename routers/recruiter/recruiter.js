const express = require('express');
const router = express.Router();
const {recruiter} = require('../../controllers/recruiter/recuiter');//Hunch/controllers/recruiter/recuiter.js


router.get("/recruiter",recruiter);


module.exports = router;