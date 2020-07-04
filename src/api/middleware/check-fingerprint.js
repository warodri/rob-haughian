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

const Fingerprint = require('../model/fingerprint');

module.exports = async (req, res, next) => {
    try {
        /**
         * Get data from user
         */
        const fingerprint = req.headers.fingerprint;
        const email = req.userData.email;
        /**
         * Check if Fingerprint exists
         */
        if (fingerprint) {
            const fp = await Fingerprint.findOne({ email, fingerprint });
            if (!fp) {
                return res.status(500).json({
                    message: 'Missing fingerprint'
                })
            } else {
                next();
            }
        } else {
            return res.status(500).json({
                message: 'Missing fingerprint'
            })    
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Missing fingerprint'
        })
    }
};
