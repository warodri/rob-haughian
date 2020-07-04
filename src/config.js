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

module.exports = {
    LINODE: '...',
    ENV: 'DEV',
    PORT: 3000,
    API: 'http://localhost:3000',
    SERVER: 'http://localhost:3000',
    JWT_KEY: '...',
    /** 
     * Mongo DB connection string 
     */
    MONGODB_SERVER: '...',
    /** 
     * To generate these for the server run: node vapid.js 
     */
    VAPID_PUBLIC: '...',
    VAPID_PRIVATE: '...',
    PUSH_NOTIFICATION_ICON: 'https://vaskit.com/android-chrome-192x192.png',
    /**
     * PLANS NAME
     */
    PLAN_FREE: 'FREE',
    PLAN_STANDARD: 'STANDARD',
    PLAN_ENTERPRISE: 'ENTERPRISE',
    /**
     * PLAN CODES
     */
    PLAN_CODE_STANDARD: '...',
    PLAN_CODE_ENTERPRISE: '...',
    /**
     * PLANS COST
     */
    PLAN_FREE_COST: 0,
    PLAN_STANDARD_COST: 10,
    PLAN_ENTERPRISE_COST: 200,
    /**
     * TOTALS PER PLAN
     */
    TOTAL_USERS_PLAN_FREE: 1,
    TOTAL_USERS_PLAN_STANDARD: 10000,
    TOTAL_USERS_PLAN_ENTERPRISE: 100000,
    /**
     * TOTAL TABLES PER PLAN
     */
    TOTAL_TABLES_PLAN_FREE: 1,
    TOTAL_TABLES_PLAN_STANDARD: 100,
    TOTAL_TABLES_PLAN_ENTERPRISE: 500,
    /**
     * MAX TRANSFERS
     */
    TOTAL_REQUESTS_PLAN_FRE: 10000,
    TOTAL_REQUESTS_PLAN_STANDARD: 2000000,
    TOTAL_REQUESTS_PLAN_ENTERPRISE: 5000000,
    /**
     * DATABASE STORAGE
     */
    TOTAL_DB_STORAGE_PLAN_FREE: 500000,
    TOTAL_DB_STORAGE_PLAN_STANDARD: 3000000,
    TOTAL_DB_STORAGE_PLAN_ENTERPRISE: 4000000,
    /**
     * DISK SPACE
     */
    TOTAL_DISK_SPACE_PLAN_FREE: 500000,
    TOTAL_DISK_SPACE_PLAN_STANDARD: 150000000,
    TOTAL_DISK_SPACE_PLAN_ENTERPRISE: 250000000,
    /**
     * TOTAL SOCKET MESSAGES
     */
    TOTAL_SOCKET_MESSAGES_PLAN_FREE: 1000,
    TOTAL_SOCKET_MESSAGES_PLAN_STANDARD: 1000000,
    TOTAL_SOCKET_MESSAGES_PLAN_ENTERPRISE: -1,
    /**
     * PUSH MESSAGES
     */
    TOTAL_PUSH_MESSAGES_PLAN_FREE: 1000,
    TOTAL_PUSH_MESSAGES_PLAN_STANDARD: 10000,
    TOTAL_PUSH_MESSAGES_PLAN_ENTERPRISE: -1,
    /**
     * STRIPE
     */
    STRIPE_PUBLISHABLE_KEY: '...',
    STRIPE_SECRET_KEY: '...',
}
