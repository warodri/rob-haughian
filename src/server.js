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

const https = require('https');
const http = require('http');
const app = require('./app');
const fs = require('fs');
const config = require('./config');
const socketFunctions = require('./socket');

const port = config.PORT;
const env = config.ENV;

if (env === 'DEV') {
        
    /**
     * Create local server
     */
    const server = http.createServer(app);

    /**
     * Create local socket
     */
    setSocketFunctions(server)

    /**
     * Start local server
     */
    server.listen(port);

} else {

    /**
     * Create production server
     */
    const options = {
        key: fs.readFileSync('/etc/letsencrypt/live/vaskit.com/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/vaskit.com/fullchain.pem')
    };    
    const server = https.createServer(options, app);

    /**
     * Sockets
     */
    setSocketFunctions(server);

     /**
      * Start production server
      */
    server.listen(port);    

}

function setSocketFunctions(server) {
    socketFunctions.setupSocket(server);
}

