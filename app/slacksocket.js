'use strict'

const WebSocket = require('websocket').w3cwebsocket

var websocket_url = null

const { Requester } = require("node-duckduckgo");
const requester = new Requester("node-slackipedia");

function connect_websocket(error, response, body) {
    var JSONResponse = JSON.parse(body)
    websocket_url = JSONResponse.url

    var ws = new WebSocket(websocket_url);

    ws.onopen = function() {
        console.log('WebSocket Client Connected')
    }

    ws.onerror = function() {
        console.log('Connection Error')
    }

    ws.onmessage = function(message) {
        if (typeof message.data === 'string') {
            console.log("Received: '" + message.data + "'");
            var msg_data = JSON.parse(message.data)
            if (typeof msg_data.type === 'string' && msg_data.type === 'message') {
                console.log(msg_data.text)
                ws.send(
                    JSON.stringify({
                        "id": 1,
                        "type": "message",
                        "channel": msg_data.channel,
                        "text": "message recieved!"
                    })
                )

                requester.request(msg_data.text, (err, response, body) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(body);
                });
            }
        }
    }
}

module.exports = connect_websocket
