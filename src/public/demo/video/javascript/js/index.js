
function showLogin() {
    /**
     * Show the form to do login
     */
    $('#loginForm').show();

    /**
     * Hide the card where we send chats
     */
    $('#chat').hide();

    /**
     * Clear logged user's email
     */
    $('#userEmail').html('');
}


/**
 * Shows the chat panel
 * Load user list
 */
function showChat() {
    /**
     * Hide the form to do login
     */
    $('#loginForm').hide();

    /**
     * Show the card where we send chats
     */
    $('#chat').show();

    /**
     * Go to the server and load our 
     * users
     */
    loadUserList();

    /**
     * Write logged user's email
     * to identify this user on screen
     */
    $('#userEmail').html( LOGGED_USER.email );
}


/**
 * List of groups this user can get into
 */
function drawTokensForThisGroup(arrLinks) {
    let out = `
        <table class="table">
            <thead>
                <tr>
                    <th>Group Name</th>
                    <th>Video Chat Group Link</th>
                </tr>
            </thead>
            <tbody>
    `;
    arrLinks.forEach( item => {
        out += `
            <tr>
                <td>${ item.groupName }</td>
                <td>
                    <a href="${ item.videoChatGroupLink }" target="_blank">
                        Access to video chat group
                    </a>
                </td>
            </tr>
        `;
    })
    out += `
            </tbody>
        </table>
    `;
    $('#myVideoChatGroups').html(out);
}


/**
 * A user is selected from the list. 
 * We will get all messages sent 
 * privatelly.
 */
function userSelectedFromList(userId) {
    /**
     * Define this user as selected
     */
    SELECTED_USER = userId;
    /**
     * Get all messages sent and received for this user
     */
    const body = {
        table: TABLE_CHAT,
        filters: [{
            key: "$or",
            value: [{
                "data.from": SELECTED_USER, 
                "data.to": LOGGED_USER._id
            }, {
                "data.from": LOGGED_USER._id, 
                "data.to": SELECTED_USER
            }]
        }]
    }
    console.dir(body);
    /**
     * Request the data using custom filters!
     */
    sendRequest('post', '/record/api/custom-filter', body, (success, response) => {
        if (success) {
            const arrData = response.data;
            drawListOfMessagesFromUser(arrData);    
        }
    })
    /**
     * Show as selected the user 
     * form the list on the left
     */
    showUserLitstOnScreen(SELECTED_USER);
}

/**
 * We need this list of users 
 * for creating rooms for users
 */
function populateSelectWithMyUsers() {
    let out = `
        <option value="">[ Select users ]</option>
    `;
    arrUsers.forEach( item => {
        out += `
        <option value="${ item._id }">${ item.name } ${ item.surname }</option>
        `;
    })
    $('#allMyUsers').html( out );
}


/**
 * One of the users from <select> was selected
 * and want to add to the list of users for a video chat room
 */
function addUserToRoom() {
    const userId = $('#allMyUsers').val();
    const userExists = arrUsersAddedForRoom.find( item => item._id == userId );
    if (!userExists) {
        const user = arrUsers.find( item => item._id == userId );
        arrUsersAddedForRoom.push( user._id );
    }
    drawAllSelectedUsers();
}


/**
 * Draw all selected users for the room
 */
function drawAllSelectedUsers() {
    let out = ``;
    arrUsersAddedForRoom.forEach( item => {
        const user = arrUsers.find( u => u._id == item );
        out += `
            <button class="btn btn-secondary m-2">
                ${ user.name } ${ user.surname }
            </button>
        `;
    })
    $('#usersAdded').html(out);
}

/**
 * Draws inside the <select> all the video chat groups
 * received from the server
 */
function drawVideoChatGroupsOnScreen() {
    /**
     * Start building the output
     */
    let out = `<table class="table">
    <thead>
        <tr>
            <th>Group Name</th>
            <th>Users Allowed</th>
            <th>Video Chat Link</th>
            <th></th>
        </tr>
    </thead>    
    <tbody>`;
    /**
     * Loop all my video chat groups...
     */
    arrMyVideoChatGroups.forEach( item => {
        console.dir(item);
        /**
         * Build a nice view for the users allowed
         * for this video chat group
         */
        let usersInRoom = `<table class="table table-borderless">`;
        item.userTokens.forEach( userToken => {
            const user = arrUsers.find( temp => temp._id == userToken.userId );
            usersInRoom += `
            <tr>
                <td>
                    ${ user.name } ${ user.surname }
                </td>
                <td>
                    <a href="${ userToken.videoChatUrl }" target="_blank">
                        Access Video Chat
                    </a>
                </td>
            </tr>
            `;
        });
        usersInRoom += `</table>`;
        /**
         * Draw button to delete this group
         */
        const butDeleteGroup = `
            <button class="btn btn-danger" onclick="removeGroup('${ item._id }')">
                Delete
            </button>
        `;
        /**
         * Build HTML for showing the data
         */
        out += `
            <tr>
                <td>
                    ${ item.name }
                </td>
                <td>
                    ${ usersInRoom }
                </td>
                <td>
                    ${ butDeleteGroup }
                </td>
            </tr>
        `;
    })
    out += `</tbody></table>`;
    /**
     * Finally show all together
     */
    $('#allMyVideoChatGroups').html(out);
}


/**
 * Check if we have a DEVELOPER KEY
 */
function checkDeveloperKey() {
    if (!DEVELOPER_KEY) {
        const valueFromLocalStorage = localStorage.getItem('developer-key');
        if (valueFromLocalStorage) {
            DEVELOPER_KEY = valueFromLocalStorage;
            checkDeveloperKey();
        } else {
            $('#askDeveloperKey').show();
        }
    } else {
        $('#askDeveloperKey').hide();
        $('#mainPanel').show();
        me();
    }
}

/**
 * Set a DEVELOPER KEY
 */
function setDeveloperKey() {
    DEVELOPER_KEY = document.getElementById('developerKey').value;
    if (DEVELOPER_KEY.trim() != '') {
        localStorage.setItem('developer-key', DEVELOPER_KEY);
        checkDeveloperKey();
    }
}

/**
 * ALL STARTS HERE
 */
$( document ).ready( () => {
    checkDeveloperKey();
})

