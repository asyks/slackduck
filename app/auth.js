'use strict'

const request = require('request')
const slacksocket = require('./slacksocket')

var bot_token = null

function send_rtm_connect_request(token) {
    var options = {
        uri: 'https://slack.com/api/rtm.connect',
        form: {
            'token': token
        }
    }

    request.post(options, slacksocket)
}

function authenticate(req, res) {
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

}

module.exports = authenticate
