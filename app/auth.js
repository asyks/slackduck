'use strict'

const req = require('request')
const slacksocket = require('./slacksocket')

module.exports.options = options
module.exports.rtm_connect = rtm_connect

function options(request) {
    return {
        uri: 'https://slack.com/api/oauth.access?code='
            + request.query.code +
            '&client_id='+ process.env.CLIENT_ID+
            '&client_secret='+ process.env.CLIENT_SECRET+
            '&redirect_uri='+ process.env.REDIRECT_URI
    }
}

function rtm_connect(token) {
    var options = {
        uri: 'https://slack.com/api/rtm.connect',
        form: {
            'token': token
        }
    }

    req.post(options, slacksocket)
}
