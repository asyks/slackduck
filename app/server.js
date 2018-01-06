'use strict'

require('dotenv').config()

const express = require('express')
const authenticate = require('./auth')

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
    var payload = {
        'page': 'home',
        'content': 'none yet'
    }

    res.json(payload)
})

app.get('/auth', function(req, res) {
    res.sendFile(__dirname + '/add_to_slack.html')
})

app.get('/auth/redirect', function(req, res) {
    authenticate(req, res)
})

app.post('/command', function(req, res) {
    res.send('Your ngrok tunnel is up and running!')
})

app.listen(PORT, HOST)

console.log(`Running on http://${HOST}:${PORT}`)
