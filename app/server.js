'use strict'

require('dotenv').config()

const express = require('express')
const req = require('request-promise')

const auth = require('./auth')
const slacksocket = require('./slacksocket')

// Constants
const PORT = 8080
const HOST = '0.0.0.0'

// App
const app = express()

// Middleware
app.use(function timeLog (request, response, next) {
    console.log('Time: ', Date.now())
    next()
})

// Routes
app.get('/', function(request, response) {
    var payload = {
        'page': 'home',
        'content': 'none yet'
    }

    response.json(payload)
})

app.get('/auth', function(request, response) {
    response.sendFile(__dirname + '/add_to_slack.html')
})

app.get('/auth/redirect', function(request, response) {

    var queryCode = request.query.code
    var options = auth.authOptions(queryCode)

    req(options)
        .then(function(body) {
            response.send('App Connection Success!')

            var rtmRequest = auth.rtmConnect(body.bot.bot_access_token)

            rtmRequest.then(function(body) {
                console.log('Real Time Messaging API Connected')
                slacksocket.connect(body.url)
            })
        })
        .catch(function(error) {
            console.log('App Connection Failed :(')
        })
})

//Error Handling
app.use((err, request, response, next) => {
    console.log(err)
    response.status(500).send('Something broke!')
})

app.listen(PORT, HOST)

console.log(`Running on http://${HOST}:${PORT}`)
