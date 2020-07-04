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

const express = require('express');
const router = express.Router();

/**
 * Middlewares
 */
const checkAuth = require('../middleware/check-auth');
const checkKey = require('../middleware/check-key');
const checkFingerprint = require('../middleware/check-fingerprint');

/**
 * Business logic
 */
const Controller = require('../controllers/developer');

/********************************* 
 * DEFINE ROUTES HERE  
 *********************************/

/**
 * Show developers screen
 */
router.get('/', Controller.main);

/**
 * From /developer users add a question
 */
router.post('/question', checkAuth, checkKey, Controller.addQuestion);

/**
 * From /developer users add a response
 */
router.post('/response', checkAuth, checkKey, Controller.addResponse);

/**
 * Get all responses from post
 */
router.get('/response/:id', Controller.getResponsesFromPost)

/**
 * Count the access for this month
 */
router.get('/traffic-count', checkAuth, checkPlan, checkFingerprint, Controller.countAccess);

module.exports = router;
