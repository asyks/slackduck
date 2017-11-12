'use strict'

require('dotenv').config()
const express = require('express')
const request = require('request')
var WebSocket = require('websocket').w3cwebsocket

// Constants
const PORT = 8080
const HOST = '0.0.0.0'

// App
const app = express()

// Middleware
app.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

// Routes
app.get('/', function(req, res) {
    var payload = {'jsonkey': 'jsonvalue', 'jsonkey2': 2}
    console.log('Payload: ', payload)
    res.json(payload)
})

// bot token
var bot_token = null
var websocket_url = null

app.get('/another-route', function(req, res) {
    var payload = {'jsonkey': 'jsonvalue', 'jsonkey2': 2}
    console.log('Payload: ', payload)
    res.json(payload)
})

app.get('/auth', function(req, res) {
    res.sendFile(__dirname + '/add_to_slack.html')
})

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
                console.log(msg_data.channel)
                ws.send(
                    JSON.stringify({
                        "id": 1,
                        "type": "message",
                        "channel": msg_data.channel,
                        "text": "message recieved!"
                    })
                )
            }
        }
    }
}

function send_rtm_connect_request(token) {
    var options = {
        uri: 'https://slack.com/api/rtm.connect',
        form: {
            'token': token
        }
    }

    request.post(options, connect_websocket)
}


app.get('/auth/redirect', function(req, res) {
    var options = {
        uri: 'https://slack.com/api/oauth.access?code='
            + req.query.code +
            '&client_id='+process.env.CLIENT_ID+
            '&client_secret='+process.env.CLIENT_SECRET+
            '&redirect_uri='+process.env.REDIRECT_URI,
        method: 'GET'
    }

    function main_auth_callback(error, response, body) {
        var JSONresponse = JSON.parse(body)

        if (!JSONresponse.ok) {
            res.send(
                "Error encountered: \n"+JSON.stringify(JSONresponse)
            ).status(200).end()
        }
        else {
            res.send("Success!")
            console.log(JSONresponse)

            bot_token = JSONresponse.bot.bot_access_token
            send_rtm_connect_request(bot_token)
        }
    }

    request(options, main_auth_callback)

})

app.post('/command', function(req, res) {
    res.send('Your ngrok tunnel is up and running!')
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
