'use strict'

require('dotenv').config()
const express = require('express')
const request = require('request')

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

app.get('/another-route', function(req, res) {
    var payload = {'jsonkey': 'jsonvalue', 'jsonkey2': 2}
    console.log('Payload: ', payload)
    res.json(payload)
})

app.get('/auth', function(req, res) {
    res.sendFile(__dirname + '/add_to_slack.html')
})

app.get('/auth/redirect', function(req, res) {
    var options = {
        uri: 'https://slack.com/api/oauth.access?code='
            + req.query.code +
            '&client_id='+process.env.CLIENT_ID+
            '&client_secret='+process.env.CLIENT_SECRET+
            '&redirect_uri='+process.env.REDIRECT_URI,
        method: 'GET'
    }

    function callback(error, response, body) {
        var JSONresponse = JSON.parse(body)

        if (!JSONresponse.ok) {
            console.log(JSONresponse)
            res.send(
                "Error encountered: \n"+JSON.stringify(JSONresponse)
            ).status(200).end()
        }
        else {
            console.log(JSONresponse)
            res.send("Success!")
        }

    }

    request(options, callback)

})

app.post('/command', function(req, res) {
    res.send('Your ngrok tunnel is up and running!')
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
