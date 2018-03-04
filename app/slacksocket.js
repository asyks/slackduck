'use strict'

const WebSocket = require('websocket').w3cwebsocket
const duckduckgoer = require('./duckduckgoer')

module.exports.connect = connect
module.exports.send = send
module.exports.responsePayload = responsePayload

function responsePayload(msgChannel, msg_text) {
    return JSON.stringify(
        {
            "id": 1,
            "type": "message",
            "channel": msgChannel,
            "text": "message recieved! '{msg_text}'".replace(
                "{msg_text}", msg_text
            )
        }
    )
}

function connect(websocketURL) {
    var webSocket = new WebSocket(websocketURL)

    webSocket.onopen = function() {
        console.log('WebSocket Client Connected')
    }

    webSocket.onerror = function() {
        console.log('WebSocket Connection Error')
    }

    webSocket.onmessage = function(message) {

        console.log("message recieved")
        
        if (typeof message.data === 'string') {
            var msgData = JSON.parse(message.data)
            console.log("Received: ", msgData)
        }
        if (
            typeof msgData.type === 'string' && msgData.type === 'message'
        ) {
            var msgChannel = msgData.channel
            var queryTerm = msgData.text.slice(13)
            duckduckgoer(webSocket, msgChannel, queryTerm)
        }
    }

    return webSocket
}

function send(webSocket, msgData) {
    null
}
