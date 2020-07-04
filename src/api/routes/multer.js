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

const multer = require('multer');
var fs = require('fs');

/**
 * Manage from here ALL the file uploads
 */
const storage = multer.diskStorage(
    {
        destination: function(req, file, cb) {

            // Destination for this file
            var newDestination = './uploads/';

            /**
             * If developer key in headers,
             * destination changes
             */
            let developer_key = req.headers ? req.headers.key : null;
            if (developer_key) {
                developer_key = new Buffer(developer_key).toString('base64');
                newDestination = './uploads/' + developer_key + '/';
            }

            /**
             * Continue...
             */
            var stat = null;
            
            try {
                stat = fs.statSync(newDestination);
            } catch (err) {
                fs.mkdirSync(newDestination);
            }
            if (stat && !stat.isDirectory()) {
                throw new Error('Directory cannot be created because an inode of a different type exists at "' + newDestination + '"');
            }       
            cb(null, newDestination);
        },

        filename: function(req, file, cb) {
            const newName = file.originalname;
            cb(null, newName);
        }

    }
);

const fileFilter = (req, file, cb) => {
    cb(null, true);
}

/**
 * Set max file size for uploads
 */
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 40
    },
    fileFilter: fileFilter
});

module.exports  = {
    upload
}