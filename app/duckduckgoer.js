'use strict'

const { Requester } = require("node-duckduckgo")
const slacksocket = require('./slacksocket')

module.exports = sendDuckRequest

const requester = new Requester("node-slackduck")
requester.no_html = 1

function sendDuckRequest(webSocket, msgChannel, queryTerm) {

    requester.request(queryTerm, function(err, response, body) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("DuckDuckGo response recieved")
            console.log(body)
            console.log(response)

            var resultUrl = JSON.parse(body).AbstractURL
            console.log(resultUrl)

            var respPayload = slacksocket.responsePayload(
                msgChannel, resultUrl
            )
            webSocket.send(respPayload)
        }
    })
}
