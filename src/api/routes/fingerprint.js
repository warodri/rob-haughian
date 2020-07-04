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

/**
 * Business logic
 */
const Controller = require('../controllers/fingerprint');

/********************************* 
 * DEFINE ROUTES HERE  
 *********************************/

/**
 * CHECK IF THIS FINGERPRINT IS VALID FOR THIS USER.
 * CALL THIS AFTER me() OR AFTER A VALID LOGIN
 */
router.get('/check', checkAuth, Controller.checkFingerprint);

/**
 * FROM AN EMAIL THE USER WILL ADD A DEVICE 
 * TO THE LIST OF AUTHORIZED DEVICES.
 */
router.get('/add/:fingerprint/:email', Controller.saveFingerprint);


module.exports = router;
