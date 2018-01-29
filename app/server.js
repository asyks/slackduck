'use strict'

require('dotenv').config()

const req = require('request')
const express = require('express')
const auth = require('./auth')

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
    req.get(auth.options(request), function(error, auth_response, body) {
        response.send("App Connection Success!")

        var bot_token = JSON.parse(body).bot.bot_access_token

        auth.rtm_connect(bot_token)
    })
})

//Error Handling
app.use((err, request, response, next) => {
    console.log(err)
    response.status(500).send('Something broke!')
})

app.listen(PORT, HOST)

console.log(`Running on http://${HOST}:${PORT}`)
