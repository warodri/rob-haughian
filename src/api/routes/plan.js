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
const Controller = require('../controllers/plan');

/********************************* 
 * DEFINE ROUTES HERE  
 *********************************/

/**
 * VASKIT - SHOW THE "SELECT THIS PLAN" PAGES
 */
router.get('/free', Controller.free);
router.get('/standard', Controller.standard);
router.get('/enterprise', Controller.enterprise);

/**
 * BUY FREE PLAN
 */
router.post('/free', checkAuth, Controller.buyFreePlan)

/**
 * STRIPE SENDS US A SUCCESS SESSION_ID 
 * After a plan was sucessfully purchased
 * 
 */
router.get('/success/:session_id', Controller.checkStripeSessionId);

/**
 * STRIPE REDIRECTS HERE AFTER A CANCELLED PLAN PURCHASING
 */
router.get('/cancel', Controller.redirectAfterCancelledPlan);

module.exports = router;
