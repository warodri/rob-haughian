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

const mongoose = require('mongoose');

const awsSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    key: { type: String, required: true },
    name: { type: String, required: true },
    bucket_data: { type: mongoose.Mixed, required: true },
    bucket_location: { type: String, required: true },
    enabled: { type: Boolean, default: true, required: false },
    owner_id: { type: String, required: true },

}, { timestamps: true });

module.exports = mongoose.model('AWS', awsSchema);
