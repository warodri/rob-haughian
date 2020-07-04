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

const userSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    key: { type: String, required: false, default: '' },
    description: { type: String, required: false },
    related_to_user_id: { type: String, required: false },
    redirect_url: { type: String, required: false, default: 'https://www.vaskit.com' }

}, { timestamps: true });

module.exports = mongoose.model('Token', userSchema);
