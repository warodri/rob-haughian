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
const checkPlan = require('../middleware/check-plan');
const checkFingerprint = require('../middleware/check-fingerprint');
const increaseTraffic = require('../middleware/increase-traffic');

/**
 * Business logic
 */
const Controller = require('../controllers/record');

/********************************* 
 * DEFINE ROUTES HERE  
 *********************************/

/**
 * API - ADD A RECORD 
 * 
 * Allowed scenarios:
 * ===================
 * - Request must have a developer Key.
 * - Request can / cannot be logged in (depends on this table's creation).
 */
router.post('/api', checkKey, checkAuth, checkPlan, increaseTraffic, Controller.add);

/**
 * API - Users want to DELETE a record.
 * 
 * Allowed scenarios:
 * ===================
 * - Request must have a developer Key.
 * - Request can / cannot be logged in (depends on this table's creation).
 */
router.delete('/api/:id', checkKey, checkAuth, checkPlan, increaseTraffic, Controller.removeFromApi);

/**
 * API - FIND RECORDS OF A TABLE BY STRING
 * 
 * Allowed scenarios:
 * ===================
 * - Request must have a developer Key.
 * - Request can / cannot be logged in (depends on this table's creation).
 */
router.post('/api/find', checkKey, checkAuth, checkPlan, increaseTraffic, Controller.find);

/**
 * API - FIND RECORDS OF A TABLE BY ID
 * 
 * Allowed scenarios:
 * ===================
 * - Request must have a developer Key.
 * - Request can / cannot be logged in (depends on this table's creation).
 */
router.post('/api/find/:id', checkKey, checkAuth, checkPlan, increaseTraffic, Controller.findById);

/**
 * API - FIND RECORDS OF A TABLE BY FILTER
 * 
 * Allowed scenarios:
 * ===================
 * - Request must have a developer Key.
 * - Request can / cannot be logged in (depends on this table's creation).
 */
router.post('/api/filter', checkKey, checkAuth, checkPlan, increaseTraffic, Controller.findByFilter);

router.post('/api/custom-filter', checkKey, checkAuth, checkPlan, increaseTraffic, Controller.findByCustomFilter);

/**
 * API - Users want to UPDATE a record.
 * 
 * Allowed scenarios:
 * ===================
 * - Request must have a developer Key.
 * - Request can / cannot be logged in (depends on this table's creation).
 */
router.put('/api/:id', checkKey, checkAuth, checkPlan, increaseTraffic, Controller.updateFromApi);


/**
 * DASHBOARD: GET ALL RECORDS FROM A TABLE
 * This will send the VISIBLE and INVISIBLE records because
 * it's called from the Dashboard
 */
 router.post('/all', checkKey, checkAuth, checkPlan, checkFingerprint, Controller.getAll);


/**
 * DASHBOARD: Users can toggle records INVISIBLE / VISIBLE.
 * - Dashboard must be logged in.
 * - Dashboard must have a plan.
 * - Dashboard must have a valid fingerprint.
 */
router.post('/:id/hide', checkKey, checkAuth, checkPlan, checkFingerprint, Controller.hideFromDashboard);
router.post('/:id/show', checkKey, checkAuth, checkPlan, checkFingerprint, Controller.showFromDashboard);

/**
 * DASHBOARD: Users want to DELETE a record.
 */
router.post('/delete/:id', checkKey, checkAuth, checkPlan, checkFingerprint, Controller.removeFromDashboard);


/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
//  SOCKET RELATED
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/**
 * SOCKET - GET ALL MY GROUPS
 * 
 * Groups are not the same as rooms. All Vaskit Users are connected to 
 * only one room, which is their developer_key.
 * 
 * A Group is a groupal conversation and they can create as many as they want.
 */
router.post('/api/socket/groups', checkKey, checkAuth, checkPlan, increaseTraffic, Controller.findMyGroupsForSocket);

/**
 * SOCKET - GET ALL THE GROUPS I'M CONNECTED TO
 */
router.post('/api/socket/groups/connected', checkKey, checkAuth, checkPlan, increaseTraffic, Controller.getGroupsIAmConnectedTo);

/**
 * SOCKET - CREATE NEW GROUP
 */
router.post('/api/socket/groups/create', checkKey, checkAuth, checkPlan, increaseTraffic, Controller.createNewChatGroup);

/**
 * SOCKET - GET MESSAGES SENT TO A GROUP I BELONG TO
 */
router.post('/api/socket/groups/:id', checkKey, checkAuth, checkPlan, increaseTraffic, Controller.getGroupMessages);

module.exports = router;
