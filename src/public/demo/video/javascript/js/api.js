
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
 * Go to the server and load my users
 */
function loadUserList() {
    sendRequest('post', '/user/api/find', {}, (success, response) => {
        arrUsers = response.users;
        showUserLitstOnScreen();
        /**
         * Load manager related only
         */
        if (LOGGED_USER.isManager) {
            $('#managerPanel').show();
            populateSelectWithMyUsers();
            loadMyVideoChatRooms();
            drawVideoChatGroupsOnScreen();    
        } else {
            $('#signedUserPanel').show();
            loadChatTokensForThisUser();
        }
    })
}


/**
 * For non-manager suers, list all the 
 * channels this user can access to.
 */
function loadChatTokensForThisUser() {
    sendRequest('get', '/meet/my_groups', {}, (success, response) => {
        if (success) {
            console.dir(response);
            const arrLinks = response.groups;
            drawTokensForThisGroup(arrLinks);
        }
    })
}

/**
 * User wants to send a private or public 
 * message
 */
function sendMessage() {
    /**
     * You can only send messages if 
     * you have a valid login
     */
    if (!LOGGED_USER) {
        logout();
        location.reload();
        return;
    }
    /**
     * Send the message now
     */
    if (SELECTED_USER) {
        /**
         * Send the private chat
         */
        sendPrivateChat();
        /**
         * Reload the list of messages
         */
        userSelectedFromList(SELECTED_USER);
    } else {
        /**
         * Send a message to all the users
         */
        sendGlobalChat();
    }    
}

/**
 * You send a private message after
 * you select a user from the list 
 */
function sendPrivateChat() {
    /**
     * Get text message
     */
    const message = $('#message');
    /**
     * Validate not empty
     */
    if (message.val().trim() === '') {
        return;
    }
    /**
     * Send message using chat
     */
    sendMessageToUser( SELECTED_USER, message.val() );
    /**
     * Store this messsage
     */
    storeMessage(SELECTED_USER, message.val());
    /**
     * Clear input
     */
    message.val('');
}

/**
 * You send a message to all the users
 */
function sendGlobalChat() {
    if (arrUsers) {
        /**
         * Get message from user
         */
        const message = $('#message');
        /**
         * Validate not empty
         */
        if (message.val().trim() === '') {
            return;
        }
        /**
         * Send message using chat
         */
        sendMessageToUser(null, message.val());
        /**
         * Store this message to all the users
         */
        arrUsers.forEach( item => {
            storeMessage(item._id, message.val());
        })
        /**
          * Clear the input box
          */
        message.val('');    
    }
}

/**
 * Stores a message
 */
function storeMessage(toUserId, message) {
    const body = {
        /**
         * This is the table we will use to save our messages.
         * Manage your tables from: https://vaskit.com/dashboard
         */
        table: TABLE_CHAT,

        /**
         * This is the data to store
         */
        data: {
            from: LOGGED_USER._id,
            to: toUserId,
            text: message,
            visible: true    
        },

        /**
         * Set security for this record
         */
        readPublic: false,
        writePublic: false,

        /**
         * List of user id who can read and 
         * write this records
         */
        readUsers:  [ LOGGED_USER._id, toUserId ],
        writeUsers: [ LOGGED_USER._id, toUserId ]

    }
    sendRequest('post', '/record/api', body, () => {
        console.log('Message stored')
    })
}

/**
 * User clicks on the LOGIN button
 */
function login() {
    const email = $('#email');
    const password = $('#password');
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


function gotoChat() {
    if (LOGGED_USER) {
        /**
         * Ask for the redirect URL
         */
        sendRequest('post', '/meet/' + LOGGED_USER._id, {}, (success, response) => {
            console.dir(response);
            if (success) {
                location.href = response.redirect_url;
            }
        })
    }
}


/**
 * Sends to VASKIT this information to 
 * create new new video chat group.
 */
function createVideoChatGroup() {
    /**
     * Get the name of the group
     * and validate not empty
     */
    const name = $('#room');
    if (name.val().trim() == '') {
        return;
    }
    /**
     * Get the rest of the fields
     * to create a video chat group
     */
    const windowTitle = $('#windowTitle');
    const cssFile = $('#cssFile');
    const introductionText = $('#introductionText');
    const notifyViaEmail = document.getElementById('notifyViaEmail').checked;
     /**
      * Build the body to send
      */
    const body = {
        name: name.val(),
        windowTitle: windowTitle.val(),
        cssFile: cssFile.val(),
        introductionText: introductionText.val(),
        notifyViaEmail,
        usersInRoom: arrUsersAddedForRoom        
    };
    sendRequest('post', '/meet/group', body, (success, response) => {
        if (success) {
            /**
             * Clear input fields
             */
            name.val('');
            windowTitle.val('');
            cssFile.val('');
            introductionText.val('');
            /**
             * Reload all data
             */
            loadMyVideoChatRooms();
        }
    })
}


/**
 * Load all my video chat rooms created from 
 * the function "createVideoChatGroup()"
 */
function loadMyVideoChatRooms() {
    sendRequest('get', '/meet/group', null, (success, response) => {
        if (success) {
            arrMyVideoChatGroups = response.groups;
            drawVideoChatGroupsOnScreen();
        }
    })
}


/**
 * Removes a video chat group from the server
 */
function removeGroup(id) {
    if (confirm('Are you sure?') === false) return;
    sendRequest('delete', '/meet/group/' + id, {}, () => {
        loadMyVideoChatRooms();
    })
}

