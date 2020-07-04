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
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongose = require('mongoose');
const config = require('./config');

/**
 * MINIFY
 * minify all the output automatically
 */
var minifyHTML = require('express-minify-html');
app.use(minifyHTML({
    override:      true,
    exception_url: false,
    htmlMinifier: {
        removeComments:             true,
        collapseWhitespace:         true,
        collapseBooleanAttributes:  true,
        removeAttributeQuotes:      true,
        removeEmptyAttributes:      true,
    }
}));


/**
 * ROUTES
 */

/** Requests to the index.html file */
const devIndex = require('./api/routes/index');

/** Private requests - should not be exposed to the internet */
const devRoutes = require('./api/routes/dev');

/** USERS */
const userRoutes = require('./api/routes/user');

/** TABLES */
const tableRoutes = require('./api/routes/table');

/** RECORDS */
const recordRoutes = require('./api/routes/record');

/** DEVELOPERS - All related to API and developers business */
const developerRoutes = require('./api/routes/developer');

/** DOCUMENTATION */
const docRoutes = require('./api/routes/doc');

/** STRIPE PLANS */
const planRoutes = require('./api/routes/plan');

/** ABOUT THE LEGAL STUFF */
const legalRoutes = require('./api/routes/legal');

/** VASKIT BLOG */
const blogRoutes = require('./api/routes/blog');

/** just for tests */
const productRoutes = require('./api/routes/product');

/** VASKIT CONSULTING */
const consultorRoutes = require('./api/routes/consultor');

/** CLIENT BROWSER FINGERPRINT */
const fingerprintRoutes = require('./api/routes/fingerprint');

/** VASKIT PUSH */
const pushRoutes = require('./api/routes/push');

/** STRIPE PAYMENTS */
const stripeRoutes = require('./api/routes/stripe');

/** VIDEO CONFERENCE */
const videoChatRoutes = require('./api/routes/videochat');

/** P2P FILE TRANSFER */
const p2pRoutes = require('./api/routes/p2p');

/** AWS */
const awsRoutes = require('./api/routes/aws');

/**
 * MongoDB ATLAS
 * USER: Gmail -> warodri.uk@gmail.com
 */
mongose.connect(config.MONGODB_SERVER, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongose.Promise = global.Promise;

/**
 * Morgan is logging framework for nodejs
 */
app.use(morgan('dev'));
app.use('./uploads', express.static('uploads'));

/**
 * Body parser
 * Used to get info as: req.body
 */
app.use(bodyParser.urlencoded({ 
    extended: true 
}));
app.use(bodyParser.json());

/**
 * CORS
 */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Max-Age", "1000000000");
    if (req.method === 'OPTIONS') {
        return res.status(200).json({});
    } else {
        next();
    }
});

/**
 * Public folder
 */
app.use(express.static('./public'));

/**
 * We use EJS templates
 */
app.set('view engine', 'ejs');

/**
 * Add here all the values you want 
 * for ALL ROUTES 
 */
app.use((req, res, next) => {
    try {
        req.SERVER = config.SERVER;
        req.API = config.API;        
        next();
    } catch (err) {
        console.log(err.message)
        next();
    }
})

/**
 * ROUTES
 */
app.use('/', devIndex);
app.use('/dev', devRoutes);
app.use('/user', userRoutes);
app.use('/table', tableRoutes);
app.use('/record', recordRoutes);
app.use('/developer', developerRoutes);
app.use('/doc', docRoutes);
app.use('/contact', contactRoutes);
app.use('/plan', planRoutes);
app.use('/legal', legalRoutes);
app.use('/blog', blogRoutes);
app.use('/product', productRoutes);
app.use('/consultor', consultorRoutes);
app.use('/fingerprint', fingerprintRoutes);
app.use('/push', pushRoutes);
app.use('/stripe', stripeRoutes);
app.use('/meet', videoChatRoutes);
app.use('/p2p', p2pRoutes);
app.use('/aws', awsRoutes);

module.exports = app;
