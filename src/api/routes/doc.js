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
const Controller = require('../controllers/doc');

/********************************* 
 * DEFINE ROUTES HERE  
 *********************************/

router.get('/', checkAuth, Controller.main);

router.get('/tables', checkAuth, Controller.table);

router.get('/security', checkAuth, Controller.security);

router.get('/users', checkAuth, Controller.users);

router.get('/data', checkAuth, Controller.records);

router.get('/push', checkAuth, Controller.push);

module.exports = router;
