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

const socket = require('socket.io');

const SocketMessages = require('./socket-messages');
const SocketRooms = require('./socket-rooms');
const SocketUsers = require('./socket-users');
const SocketGroups = require('./socket-groups');
const SocketVideoChat = require('./socket-videochat');

module.exports.setupSocket = async (server) => {

    io = socket(server);

    io.on('connection', client => {

        /**
         * THIS CLIENT GETS DISCONNECTED
         */
        client.on('disconnect', () => {
            try {
                SocketUsers.disconnect(data);
            } catch (error) {
                serverToSender(client, 'error', error.message);
            }
        })

        /**
         * A CLIENT IS SENDING DATA TO THE SERVER
         */
        client.on('client-to-server', (data) => {
            try {
                SocketMessages.processClientMessageSimple(data);
            } catch (error) {
                serverToSender(client, 'error', error.message);
            }
        });

        /**
         * CLIENT WANTS TO LOGIN USING HIS TOKEN
         */
        client.on('login', (token) => {
            try {
                SocketUsers.login(token);
            } catch (error) {
                serverToSender(client, 'error', error.message);
            }
        });

        /**
         * CLIENT WANTS A LIST OF CONNECTED USERS ONLY ON HIS ROOM
         */
        client.on('get-list-connected-users', (token) => {
            try {
                SocketUsers.getListOfConnectedUsers(token);
            } catch (error) {
                serverToSender(client, 'error', error.message);
            }
        })

        /**
         * CLIENT WANTS A LIST OF ALL THE ROOM HE IS CONNECTED TO
         * (it should be only one, his key)
         */
        client.on('get-rooms-i-am-connected-to', () => {
            try {
                SocketRooms.getRoomsIamConnectedTo();
            } catch (error) {
                serverToSender(client, 'error', error.message);
            }
        })

        /**
         * CLIENT WANTS INFORMATION ABOUT A CLIENT
         * make sure it's a client inside his room only
         */
        client.on('get-info-about-client-id', (clientId) => {
            try {
                SocketUsers.getInfoAboutClientId(clientId);
            } catch (err) {
                serverToSender(client, 'error', err.message);
            }
        })

        /**
         * A CLIENT WANTS TO SEND A MESSAGE TO ANOTHER USER
         */
        client.on('message', (userId, data) => {
            try {
                SocketMessages.processClientMessage(userId, data);
            } catch (err) {
                serverToSender(client, 'error', err.message);
            }
        })

        /**
         * A CLIENT WANTS TO SEND A MESSAGE TO ONE
         * OF HIS GROUPS
         */
        client.on('message-to-group', (user_id, chatGroupId, groupName, data) => {
            try {
                SocketMessages.sendMessageToGroup(user_id, chatGroupId, groupName, data);
            } catch (err) {
                serverToSender(client, 'error', err.message);
            }
        })

        /**
         * CLIENT WANTS TO JOIN TO A GROUP
         */
        client.on('join-group', (key, user_id, group_id) => {
            try {
                SocketGroups.joinToGroup(key, user_id, group_id);
            } catch (err) {
                serverToSender(client, 'error', err.message);
            }
        })

        /**
         * CLIENT WANTS TO LEAVE A GROUP
         */
        client.on('leave-group', (userId, groupName) => {
            try {
                SocketGroups.leaveGroup(userId, groupName);
            } catch (err) {
                serverToSender(client, 'error', err.message);
            }
        })

        /********************************
         * P2P AND ROOMS
         ********************************/     
        
        /**
         * Client join to a room
         */
        client.on('join-room', (room) => {
            try {
                SocketGroups.joinRoom(room);
            } catch (err) {
                serverToSender(client, 'error', err.message);
            }
        })

        /**
         * Send a message to all users in this room
         * except sender
         */
        client.on('message-to-room', (message) => {            
            try {
                SocketRooms.sendMessage(message);
            } catch (err) {
                serverToSender(client, 'error', err.message);
            }
        })

        /**
         * Send a message to all users in this room
         * including sender
         */
        client.on('message-to-room-including-sender', (message) => {            
            try {
                SocketRooms.sendMessageToAllUsers(message);
            } catch (err) {
                serverToSender(client, 'error', err.message);
            }
        })

        /**
         * Leave a room
         */
        client.on('leave-room', (room) => {
            try {
                SocketRooms.leave(room);
            } catch (err) {
                serverToSender(client, 'error', err.message);
            }
        })

        /**
         * Client send bytes of a file
         */
        client.on('send-bytes', (name, type, size, bytes) => {
            try {
                SocketMessages.processFile(name, type, size, bytes);
            } catch (err) {
                serverToSender(client, 'error', err.message);
            }
        })

        /**
         * Client finishes sending bytes from a file
         */
        client.on('send-bytes-ended', (name, type, size) => {
            try {
                SocketMessages.fileSendEnded(name, type, size);
            } catch (err) {
                serverToSender(client, 'error', err.message);
            }
        })


        /*********************************
         * GROUP VIDEO CHAT
         ********************************/

        /**
         * New video chat message
         */
        client.on('videochat-message', (message) => {
            try {
                SocketVideoChat.processMessage(message);
            } catch (err) {
                serverToSender(client, 'error', err.message);
            }
        });

        /**
         * Join to a video chat group
         */
        client.on('create or join', (message) => {
            try {
                SocketVideoChat.createGroup(message);
            } catch (err) {
                serverToSender(client, 'error', err.message);
            }     
        });

    });
}


/**
 * SERVER TO CLIENT
 * this is a private message
 */
function serverToSender(socket, key, value) {
    socket.emit(key, value);
}



