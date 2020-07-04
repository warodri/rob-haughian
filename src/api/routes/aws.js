const express = require('express');
const router = express.Router();

/**
 * Middlewares
 */
const checkAuth = require('../middleware/check-auth');
const checkKey = require('../middleware/check-key');
const checkPlan = require('../middleware/check-plan');
const checkFingerprint = require('../middleware/check-fingerprint');

/**
 * File upload
 */
const { upload } = require('./multer');

/**
 * Business ,ogic
 */
const Controller = require('../controllers/aws');


/********************************* 
 * DEFINE ROUTES HERE  
 *********************************/

 
/**
 * DASHBOARD - GET CLIENT ID AND SECRET
 */
router.get('/dashboard', checkAuth, checkPlan, checkFingerprint, Controller.dashboardGet)

/**
 * DASHBOARD - UPDATE AWS ID AND SECRET
 */
router.put('/dashboard', checkAuth, checkPlan, checkFingerprint, Controller.dashboardPut)

/**
 * API - LIST UPLOADED FILES
 */
router.get('/upload', checkAuth, checkPlan, checkKey, Controller.listUploadedFiles)
// Copyright 2020 Vaskit.com. All Rights Reserved.
//
// This code is not for commercial use.
//
//     https://vaskit.com
//
// This code is distributed under Proprietary license. 
// This work may not be modified or redistributed.
//
// Business software (or a business application) is any software or 
// set of computer programs used by business users to perform various 
// business functions. These business applications are used to 
// increase productivity, to measure productivity and to perform 
// other business functions accurately.

/**
 * API - UPLOAD FILES TO BUCKET
 */
router.post('/upload', checkAuth, checkPlan, checkKey, upload.single('file'), Controller.uploadFilesToBucket);

/**
 * API - GET MY BUCKETS
 */
router.get('/buckets', checkAuth, checkPlan, checkKey, Controller.getMyBuckets);

/**
 * API - CREATE NEW BUCKET
 */
router.post('/buckets', checkAuth, checkPlan, checkKey, Controller.createBucket);

/**
 * API - TRANSLATE
 * 
 * Amazon language codes:
 * https://docs.aws.amazon.com/translate/latest/dg/what-is.html#what-is-languages
 * 
 */
router.post('/translate', checkAuth, checkPlan, checkKey, Controller.translate);

module.exports = router;
