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
 * Business logic
 */
const Controller = require('../controllers/dev');

/********************************* 
 * DEFINE ROUTES HERE  
 *********************************/

/**
 * Just to test the server.
 * Not used since a long time now (Jun 2020)
 */
router.get('/test', Controller.test);

module.exports = router;
