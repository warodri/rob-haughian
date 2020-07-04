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
const checkKey = require('../middleware/check-key');
const checkPlan = require('../middleware/check-plan');
const checkAuth = require('../middleware/check-auth');
const checkFingerprint = require('../middleware/check-fingerprint');

/**
 * Business logic
 */
const Controller = require('../controllers/user');

/********************************* 
 * DEFINE ROUTES HERE  
 *********************************/

/**
 * VASKIT - ADD USERS FROM WEBSITE
 */
router.post('/add', Controller.add);

/**
 * VASKIT - Send email to users for reseting his password
 */
router.post('/password', Controller.sendPasswordRequestFromVaskit);

/**
 * VASKIT - From Email, users see this screen to enter a new password.
 */
router.get('/password/:token', Controller.askNewPasswordFromVaskit);

/**
 * VASKIT - Once the user clicks on the link from the Email, they come here for changing his password
 */
router.post('/reset', Controller.resetPasswordVaskit);

/**
 * VASKIT - SHOW LOGIN TEMPLATE
 */
router.get('/login', Controller.showLogin);

/**
 * VASKIT - DO LOGIN FROM WEBSITE
 */
router.post('/login', Controller.login);

/**
 * VASKIT - CALL ME TO CHECK FOR AUTH OK
 */
router.post('/me', checkAuth, Controller.me);

/**
 * VASKIT - UPDATE USERS
 */
router.put('/:id', checkAuth, Controller.updateFromVaskit);

/**
 * VASKIT - UPDATE PROFILE PICTURE
 */
router.post('/avatar/:id', checkAuth, upload.single('file'), Controller.updateAvatarFromVaskit);

/**
 * VASKIT - USER WANTS TO CANCEL PLAN
 */
 router.post('/cancel/:id', checkAuth, checkPlan, checkFingerprint, Controller.cancelPlan);

/**
 * FROM EMAIL, USER CONFIRMS HE WANTS TO CANCEL HIS PLAN 
 */
router.get('/confirm/:token_id', Controller.confirmCancelPlan); 

/**
 * DASHBOARD - Manage my users
 */
router.get('/manage', Controller.dashboardManage);

/**
 * DASHBOARD - GET ALL MY USERS 
 */
router.get('/users', checkKey, checkAuth, checkPlan, checkFingerprint, Controller.dashboardGetAll);

/**
 * DASHBOARD - BLOCK / UNBLOCK USER
 */
router.post('/block/:id', checkKey, checkAuth, checkPlan, checkFingerprint, Controller.dashboardBlock);
router.post('/unblock/:id', checkKey, checkAuth, checkPlan, checkFingerprint, Controller.dashboardUnblock);

/**
 * DASHBOARD - DELETE USER
 */
router.delete('/:id', checkKey, checkAuth, checkPlan, checkFingerprint, Controller.dashboardDelete);

/**
 * DASHBOARD - USER PROFILE
*/
router.get('/profile/:id', Controller.showUserProfile);

/**
 * DASHBOARD - ADD USER
 */
router.post('/', checkAuth, checkKey, checkPlan, increaseTraffic, Controller.addFromApi);


/**
 * API - ADD USER
 * 
 * Allowed scenarios:
 * ===================
 * - You just need your developer key to create a user
 */
router.post('/api', checkKey, checkAuth, checkPlan, increaseTraffic, Controller.addFromApi);

/**
 * API - UPDATE USERS
 * 
 * Allowed scenarios:
 * ===================
 * - Parent user updates users
 */
router.post('/api/update/:id', checkKey, checkAuth, checkPlan, increaseTraffic, Controller.updateFromApi);

/**
 * API - FIND USERS
 * 
 * Allowed scenarios:
 * ===================
 * - Parent user finds users
 * - Child users finds users
 */
router.post('/api/find', checkKey, checkAuth, checkPlan, increaseTraffic, Controller.findFromApi);
router.post('/api/filter', checkKey, checkAuth, checkPlan, increaseTraffic, Controller.filterFromApi);
router.post('/api/find/:id', checkKey, checkAuth, checkPlan, increaseTraffic, Controller.findUserById);

/**
 * API - DO LOGIN FROM API
 * 
 * Allowed scenarios:
 * ===================
 * - Parent user tries to login
 * - Child users try to login
 */
router.post('/api/login', Controller.loginApi);

/**
 * API - CALL ME TO CHECK FOR AUTH OK
 * 
 * Allowed scenarios:
 * ===================
 * - Parent user tries to get info about himself
 * - Child users try to get info about himself
 */
router.post('/api/me', checkKey, checkAuth, checkPlan, increaseTraffic, Controller.meFromApi);

/**
 * API - REMOVE MY USERS (USERS CAN REMOVE USERS ONLY IF THE KEY IS FROM THEM)
 * 
 * Allowed scenarios:
 * ===================
 * - Parent user removes users
 * - Child users remove users
 */
router.delete('/api/:id', checkKey, checkAuth, checkPlan, increaseTraffic, Controller.removeFromApi);

/**
 * API - UPDATE PROFILE PICTURE 
 * 
 * Allowed scenarios:
 * ===================
 * - Only the signed user with a valid developer key can update his avatar
 */
router.post('/api/avatar/:id', checkKey, checkAuth, checkPlan, increaseTraffic, upload.single('file'), Controller.updateAvatarFromApi);

/**
 * API - UPLOAD FILE
 * 
 * Allowed scenarios:
 * ===================
 * - Users can upload files. We keep track of how much space in disk is this user using.
 * 
 * TODO: block when the space in disk is > than the one allowed by his plan.
 */
router.post('/api/upload', checkKey, blockNoLogin, checkPlan, increaseTraffic, upload.single('file'), Controller.uploadFile);



////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
//  CURRENTLY TESTING THE FOLLOWING MANUALLY
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * API - Send activation code to users
 */
router.post('/activate/:id', checkKey, checkAuth, checkPlan, Controller.sendActivationCode);

/**
 * API - Users click on the link from the Email and come to here
 */
router.get('/activate/:id', Controller.activateUser);

/**
 * API - Send email to users for reseting his password
 */
router.post('/password/:id', checkKey, checkAuth, checkPlan, Controller.sendPasswordRequest);

/**
 * API - From Email, users see this screen to enter a new password.
 */
router.get('/password/:token', Controller.askNewPassword);

/**
 * API - Once the user clicks on the link from the Email, they come here for changing his password
 */
router.post('/reset', Controller.resetPassword);


module.exports = router;
