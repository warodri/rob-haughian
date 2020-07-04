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

/**
 * CHECK IF THIS USER AND THIS FINGERPRINT
 * ARE ALLOWED TO BE CONNECTED TO THIS SERVER
 */
exports.checkFingerprint = async (req, res, next) => {
    try {
        // ...
    } catch( err ) {
        res.render('500', {
            error: err.message
        })
    }
}

/**
 * SAVE A FINGERPRINT FROM THE EMAIL MESSAGE
 * WE SEND TO USERS
 */
exports.saveFingerprint = async (req, res, next) => {
    try {
        // ...
    } catch( err ) {
        res.render('500', {
            error: err.message
        })
    }
}

