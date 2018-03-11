'use strict'

const WebSocket = require('websocket').w3cwebsocket
const duckduckgoer = require('./duckduckgoer')

module.exports.connect = connect
module.exports.responsePayload = responsePayload

function responsePayload(msgChannel, msg_text) {
    return JSON.stringify(
        {
            "id": 1,
            "type": "message",
            "channel": msgChannel,
            "text": "Here's What I Found {msg_text}".replace(
                "{msg_text}", msg_text
            )
        }
    )
}

function isQueryMessage(msgData) {

    if (
        typeof msgData.type === 'string' &&
        msgData.type === 'message' &&
        'text' in msgData
    ) {
        console.log("Query Message: ", msgData)

        return true
    }
    console.log("Non-Query Message: ", msgData)

    return false
}

function parseMsgText(msgText) {
    console.log(msgText)

    var searchTerm = msgText.slice(13)
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

        if (typeof message.data === 'string') {
            var msgData = JSON.parse(message.data)
            console.log("Received: ", msgData)

            if (isQueryMessage(msgData)) {
                var msgChannel = msgData.channel
                var searchTerm = parseMsgText(msgData.text)
                duckduckgoer(webSocket, msgChannel, searchTerm)
            }
        }
    }

    return webSocket
}
