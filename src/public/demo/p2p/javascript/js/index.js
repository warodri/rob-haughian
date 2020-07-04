

function showLogin() {
    /**
     * Show the form to do login
     */
    $('#loginForm').show();
    /**
     * Hide the introduction card
     */
    $('#chat').hide();
    /**
     * Clear logged user's email
     */
    $('#userEmail').html('');
}


/**
 * Shows the main panel
 */
function showChat() {
    /**
     * Hide the form to do login
     */
    $('#loginForm').hide();
    /**
     * Show the main informative panel
     */
    $('#chat').show();
    /**
     * Write logged user's email
     * to identify this user on screen
     */
    $('#userEmail').html(LOGGED_USER.email);
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
$(document).ready(() => {
    checkDeveloperKey();
})


