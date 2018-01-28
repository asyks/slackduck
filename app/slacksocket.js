'use strict'

const WebSocket = require('websocket').w3cwebsocket

var websocket_url = null

const { Requester } = require("node-duckduckgo");
const requester = new Requester("node-slackipedia");

function create_response_payload(msg_channel, msg_text) {
    return JSON.stringify(
        {
            "id": 1,
            "type": "message",
            "channel": msg_channel,
            "text": "message recieved! '{msg_text}'".replace(
                "{msg_text}", msg_text
            )
        }
    )
}

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

        console.log("message recieved")
        
        if (typeof message.data === 'string') {
            var msg_data = JSON.parse(message.data)

            console.log("Received: '" + msg_data + "'")
        }

        if (
            typeof msg_data.type === 'string' && msg_data.type === 'message'
        ) {
            var msg_channel = msg_data.channel
            var msg_text = msg_data.text.slice(13)

            send_duck_duck_go_request(msg_text)

            var response_payload = create_response_payload(
                msg_channel, msg_text
            )

            ws.send(response_payload)
        }
    }
}

function send_duck_duck_go_request(msg_data) {

    requester.request(msg_data.text)
        .on("data", (data) => {
            console.log("Data recieved");
            console.log(data.toString());
        })
        .on("error", (err) => {
            console.log("ERROR!");
            console.log(err);
        });
}

module.exports = connect_websocket
