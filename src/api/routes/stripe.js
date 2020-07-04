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
const Controller = require('../controllers/stripe');


/********************************* 
 * DEFINE ROUTES HERE  
 *********************************/

/**
 * Receive Stripe Webhooks
 */
router.post('/webhook', Controller.processStripeWebhooks)

/**
 * All starts here - Sending the PLAN ID to this
 * STANDARD - ENTERPRISE
 * I have these 2 configured in Stripe
 */
router.post('/create/checkout/session', checkAuth, Controller.createCheckoutSession);


module.exports = router;
