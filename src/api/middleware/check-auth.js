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

const jwt = require('jsonwebtoken')
const config = require('../../config');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            const decoded = jwt.verify(token, config.JWT_KEY)
            req.userData = decoded;    
            next();
        } else {
            return res.status(401).json({
                message: 'Not authorized'
            })
        }
    } catch (err) {
        return res.status(401).json({
            message: 'Not authorized'
        })
    }
};