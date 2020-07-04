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

/**
 * Business logic
 */
const Controller = require('../controllers/videochat');


/********************************* 
 * DEFINE ROUTES HERE  
 *********************************/

/**
 * Removes a Video Chat Group
 */
router.delete('/group/:id', checkAuth, checkPlan,  Controller.removeVideochatGroup)

/**
 * Gets all the video chat created by this developer key
 * using the route below: post to '/meet/group'
 */
router.get('/group', checkAuth, checkPlan, Controller.getVideoChat)

/**
 * Manager developer wants to create a room
 * for video chatting with users.
 */
router.post('/group', checkAuth, Controller.createRoom)


/**
 * Get all the groups for this logged user.
 * This will return only the video chat groups for 
 * this logged user only.
 */
router.get('/groups', checkAuth, Controller.getAllUserGroups)


/**
 * LINK TO ACCESS THE VIDEO CHAT GROUP
 * 
 * You can generate these links by using the routers
 * in this file. Check: router.post('/group', ... )
 * 
 */
router.get('/:userToken', Controller.GetLinks);


module.exports = router;