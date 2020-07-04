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

module.exports = (req, res, next) => {
    try {
        const key = req.headers.key;
        if (key) {
            next();
        } else {
            return res.status(500).json({
                message: 'Missing developer KEY'
            })    
        }
    } catch (err) {
        return res.status(500).json({
            message: 'Missing developer KEY'
        })
    }
};

