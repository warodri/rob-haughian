

/**
 * Check if we have a DEVELOPER KEY
 */
function checkDeveloperKey() {
    if (!DEVELOPER_KEY) {
        $('#askDeveloperKey').show();
    } else {
        $('#askDeveloperKey').hide();
        $('#mainPanel').show();
        getAllRecords();
    }
}

/**
 * Set a DEVELOPER KEY
 */
function setDeveloperKey() {
    DEVELOPER_KEY = document.getElementById('developerKey').value;
    if (DEVELOPER_KEY.trim() != '') {
        checkDeveloperKey();
    }
}

/**
 * SATART HERE
 */
$( document ).ready( () => {
    checkDeveloperKey();
})
