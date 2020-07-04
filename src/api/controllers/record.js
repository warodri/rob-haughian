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
 * ADDS A RECORD FROM AN API REQUEST
 * {
 *   table: 'my table',
 *   data: {
 *     name: 'walter',
 *     surname: 'Rodriguez'
 *   },
 *   readPublic  : true,
 *   writePublic : true,
 *   readUsers   : [],
 *   writeUsers  : [],
 *  
 *   inform: false,
 * }
 * 
 * HEADER: 
 *  key
 *  authorization
 */
exports.add = async (req, res, next) => {
    try {
        // ...
    } catch( err ) {
        res.render('500', {
            error: err.message
        })
    }
}


exports.removeFromApi = async (req, res, next) => {
    try {
        // ...
    } catch( err ) {
        res.render('500', {
            error: err.message
        })
    }
}


/**
 * API - FIND RECORDS IN A TABLE BY THE STRING 
 * QUERY SENT FROM CLIENT
 */
exports.find = async (req, res, next) => {
    try {
        // ...
    } catch( err ) {
        res.render('500', {
            error: err.message
        })
    }
}

/**
 * API - FIND RECORDS IN A TABLE BY ID 
 * ID SENT FROM CLIENT
 */
exports.findById = async (req, res, next) => {
    try {
        // ...
    } catch( err ) {
        res.render('500', {
            error: err.message
        })
    }
}


/**
 * API - FIND RECORDS IN A TABLE BY FILTER 
 * FILTER SENT FROM CLIENT
 */
exports.findByFilter = async (req, res, next) => {
    try {
        // ...
    } catch( err ) {
        res.render('500', {
            error: err.message
        })
    }
}


/**
 * API - FIND RECORDS IN A TABLE BY CUSTOM FILTER 
 * FILTER SENT FROM CLIENT
 */
exports.findByCustomFilter = async (req, res, next) => {
    try {
        // ...
    } catch( err ) {
        res.render('500', {
            error: err.message
        })
    }
}


/**
 * API - UPDATE RECORD
 */
exports.updateFromApi = async (req, res, next) => {
    try {
        // ...
    } catch( err ) {
        res.render('500', {
            error: err.message
        })
    }
}

exports.getAll = async (req, res, next) => {
    try {
        // ...
    } catch( err ) {
        res.render('500', {
            error: err.message
        })
    }
}


/**
 * From DASHBOARD, users can toggle records INVISIBLE / VISIBLE.
 * - Dashboard must be logged in.
 * - Dashboard must have a plan.
 * - Dashboard must have a valid fingerprint.
*/
exports.hideFromDashboard = async (req, res, next) => {
    try {
        // ...
    } catch( err ) {
        res.render('500', {
            error: err.message
        })
    }
}


/**
 * From DASHBOARD, users can toggle records INVISIBLE / VISIBLE.
 * - Dashboard must be logged in.
 * - Dashboard must have a plan.
 * - Dashboard must have a valid fingerprint.
*/
exports.showFromDashboard = async (req, res, next) => {
    try {
        // ...
    } catch( err ) {
        res.render('500', {
            error: err.message
        })
    }
}


exports.removeFromDashboard = async (req, res, next) => {
    try {
        // ...
    } catch( err ) {
        res.render('500', {
            error: err.message
        })
    }
}

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
//  SOCKET RELATED
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/**
 * API - SOCKET - GET MY CONVERSARION GROUPS
 */
exports.findMyGroupsForSocket = async (req, res, next) => {
    try {
        // ...
    } catch( err ) {
        res.render('500', {
            error: err.message
        })
    }
}


/**
 * API - SOCKET - GET ALL THE GROUPS I'M CONNECTED TO
 */
exports.getGroupsIAmConnectedTo = async (req, res, next) => {
    try {
        // ...
    } catch( err ) {
        res.render('500', {
            error: err.message
        })
    }
}



/**
 * API - SOCKET - CREATE NEW GROUP
 */
exports.createNewChatGroup = async (req, res, next) => {
    try {
        // ...
    } catch( err ) {
        res.render('500', {
            error: err.message
        })
    }
}



/**
 * API - SOCKET - GET MESSAGES SENT TO A GROUP I BELONG TO
 */
exports.getGroupMessages = async (req, res, next) => {
    try {
        // ...
    } catch( err ) {
        res.render('500', {
            error: err.message
        })
    }
}

