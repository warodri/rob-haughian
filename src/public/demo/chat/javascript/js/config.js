/**
 * VASKIT API endpoint
 */
const ENDPOINT = 'https://vaskit.com';

/**
 * VASKIT developer key
 */
let DEVELOPER_KEY = null;

/**
 * Store your logged user here.
 */
var LOGGED_USER = null;

/**
 * Selected user from the left list 
 * of users
 */
var SELECTED_USER = null;

/**
 * Table where we save our messages
 * This is a private table.
 */
const TABLE_CHAT = 'chat-messages';

/**
 * This is the list of my users
 * 
 * Users are attached to your DEVELOPER KEY
 * and you can define from your Dashboard if 
 * users will be opened to read for anybody 
 * or only by you (https://vaskit.com/dashboard)
 * 
 */
var arrUsers = [];
