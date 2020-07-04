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
const checkPlan = require('../middleware/check-plan');
const checkKey = require('../middleware/check-key');
const checkFingerprint = require('../middleware/check-fingerprint');

/**
 * Business logic
 */
const Controller = require('../controllers/table');

/********************************* 
 * DEFINE ROUTES HERE  
 *********************************/

/**
 * VASKIT - CREATE TABLE
 * - User must be signed.
 * - User must have a plan.
 * - User must have a DEVELOPER KEY.
 * - User must have a valid fingerprint.
 */
router.post('/', checkAuth, checkKey, checkPlan, checkFingerprint, Controller.add);


/**
 * VASKIT - MANAGE TABLES SCREEN
 * Authentication is checked inside the EJS
 */
router.get('/manage', Controller.manage);


/**
 * VASKIT - GET MY TABLES
 * - Users must be authenticated.
 * - Users must have a plan.
 * - Users must have a valid fingerprint.
 */
router.get('/', checkKey, checkAuth, checkPlan, checkFingerprint, Controller.get);


/**
 * VASKIT - DELETE ONE OF MY TABLES
 * - Users must be authenticated.
 * - Users must have a plan.
 * - Users must have a valid fingerprint.
 */
router.delete('/:id', checkKey, blockNoLogin, blockNoPlan, checkFingerprint, Controller.remove);


/**
 * VASKIT - UPDATE ONE OF MY TABLES
 * - Users must be authenticated.
 * - Users must have a plan.
 * - Users must have a valid fingerprint.
 */
router.put('/:id', checkKey, checkAuth, checkPlan, checkFingerprint, Controller.update);


/**
 * DASHBOARD - USERS CLICK ON THE BUTTON "View Records" TO SEE 
 * THE RECORDS FROM ONE OF HIS TABLES.
 */
router.get('/:tableId/records', Controller.view);


/**
 * DASHBOARD: COUNT THE TOTAL OF TABLES I HAVE
 */
router.get('/count', checkKey, checkAuth, checkPlan, checkFingerprint, Controller.count);


module.exports = router;
