const express = require('express');
const router = express.Router();

/**
 * Middlewares
 */
const checkAuth = require('../middleware/check-auth');
const checkKey = require('../middleware/check-key');
const checkPlan = require('../middleware/check-plan');

/**
 * Business logic
 */
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

const Controller = require('../controllers/push');

/**
 * Get the keys to do push
 */
const keys = require("../../application-server-keys.json");

/**
 * Set the keys and my email
 */
webpush.setVapidDetails(
    "mailto:warodri@gmail.com",
    keys.publicKey,
    keys.privateKey
);

/********************************* 
 * DEFINE ROUTES HERE  
 *********************************/

/**
 * Applications using VASKIt must send first a request to this POST 
 * and get the URL to send for subscribing a user to receive PUSH.
 * This is because I need to confirm that the user is valid and 
 * the developer key as well.
 */
router.post('/subscription', checkAuth, checkKey, Controller.getSubscribeUrl)

/**
 * Get the INDEX file. 
 * This file will be called from our customer's applications
 * 
 * See this above for more info about this GET:
 * router.post('/get_subscribe_url', checkKey, blockNoLogin, blockNoPlan, (req, res, next) => { ... }
 */
router.get('/:token', Controller.showIndexFile)

/**
 * A customer will register to receive our notifications
 */
router.post('/register', checkAuth, checkKey, Controller.registerClient)

/**
 * API - Unsuscribe user
 */
router.post('/unsuscribe/:id', checkAuth, checkKey, Controller.unsuscribeUser)

/**
 * API
 * get my users subscripted for PUSH notifications
 */
router.get('/', checkAuth, checkKey, Controller.getSubscribedUsers)

/**
 * A customer will trigger a PUSH notification
 */
router.post('/trigger', checkAuth, checkPlan, Controller.triggerPush)


/**
 * API - GET MY SUBSCRIPTIONS
 * Get a list of all my users subscribed to receive push notifications
 */
router.get('/api/subscriptions', checkKey, Controller.getUsersSubscribed);

/**
 * API - REMOVE SUBSCRIPTION FROM PUSH
 */
router.delete('/api/subscriptions', checkKey, Controller.removeSubscribedUser);


/**
 * DASHBOARD
 * Get a list of all my users subscribed to receive push notifications
 */
router.get('/subscriptions', checkAuth, checkKey, Controller.getAllSubscribedUsers);


module.exports = router;
