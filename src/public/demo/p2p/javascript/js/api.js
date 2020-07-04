
/**
 * Get the information from my user, 
 * based on my saved token.
 * 
 * If no saved or invalid token, show
 * users the LOGIN form.
 */
function me() {
    doVaskitMe((success, user) => {
        if (success) {
            /**
             * I'm logged in
             */
            LOGGED_USER = user;
            showChat();
            vaskitSocketStart();
        } else {
            /**
             * Token is invalid or 
             * does not exist
             */
            LOGGED_USER = null;
            showLogin();
        }
    });
}


/**
 * Sends the file via VASKIT Peer
 */
function sendFile(ele) {
    /**
     * Check if we're logged in
     */
    if (!LOGGED_USER) {
        location.reload();
        return;
    }
    /**
     * This is the selected file
     * to send via VASKIT Peer
     */
    fileSelected = ele.files[0];
    fileName = fileSelected.name;
    fileType = fileSelected.type;
    fileSize = fileSelected.size;

    /**
     * Write a message to this device
     */
    $('#info').html('Sending file...');

    /**
     * Send a message to show on the 
     * receiving device.
     */
    vaskitSendMessageToRoom('Receiving a ' + 
        fileSize + ' bytes file. Please wait...');

    /**
     * Read the file to send and put it 
     * in memory (this device should be 
     * able to handle this size in memory)
     */
    var bytes =  new Blob([fileSelected]);

    /**
     * Send the file using VASKIT Peer
     */
    vaskitSendBytes(fileName, fileType, fileSize, bytes);

    /**
     * Inform to this device that the 
     * file is on its wait
     */
    $('#info').html(`File Sent. It may take some time 
        for the other deivce to receive this file`);
    
    /**
     * Let's say the other part that we already
     * sent the file
     */
    vaskitInformFileWasUploaded(fileName, fileType, fileSize);

}


/**
 * Receiving bytes from another peer
 */
function onBytesReceived(name, type, size, bytes) {

    fileName = name;
    fileType = type;
    fileSize = size;

    if (!bytesReceived) {
        bytesReceived = bytes;
    } else {
        bytesReceived += bytes;
    }
}


/**
 * The entire file was received from the other peer
 */
function onBytesReceivedCompleted(name, type, size, bytes) {
    /**
     * Show download link
     */
    $('#info').html(`
    <div class="mt-2 mb-2">
        <a href="javascript:vaskitDownloadBytesReceivedAsFile(bytesReceived, fileName, fileType)">
            Download ${ name }
        </a>
    </div>`);
}




/**
 * This client has joined to a room
 */
function onThisClientJoinedToRoom(room) {
    console.log('Client joined to room: ' + room);
}

/**
 * Called from socket.js because
 * we are not logged in into VASKIT sockets
 */
function doAfterSocketIsLoggedIn() {
    console.log('Socket logged in.');
    addClientToRoom(LOGGED_USER._id);
}


/**
 * User clicks on the LOGIN button
 */
function login() {
    const email = $('#email');
    const password = $('#password');
    /**
     * Go and do a vaskit login
     */
    doVaskitLogin(email.val(), password.val(), (success, token) => {
        if (success) {
            setToken(token)
            location.reload();
        } else {
            alert('Invalid login!');
            arrUsers = [];
        }
    })
}


/**
 * User clicks on the LOGOUT button
 */
function logout() {
    doVaskitLogout();
    location.reload();
}