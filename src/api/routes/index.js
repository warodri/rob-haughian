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
const Controller = require('../controllers/index');

/********************************* 
 * DEFINE ROUTES HERE  
 *********************************/

/**
 * Simple redirection:
 * Shows the VASKIT main page
 */
router.get('/', checkAuth, Controller.index);

/**
 * Simple redirection:
 * Showd the DASHBOARD page
 */
router.get('/dashboard', Controller.dashboard);


module.exports = router;
