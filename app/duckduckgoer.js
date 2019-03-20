'use strict'

const { Requester } = require('node-duckduckgo')

const slacksocket = require('./slacksocket')

module.exports.sendDuckRequest = sendDuckRequest

const requester = new Requester('node-slackduck')
requester.no_html = 1

function sendDuckRequest (webSocket, msgChannel, queryTerm) {
  requester.request(queryTerm, (err, response, body) => {
    if (err) {
      console.log(err)
    } else {
      console.log('DuckDuckGo response recieved')

      var jsonBody = JSON.parse(body)

      var respPayload = slacksocket.responsePayload(
        msgChannel, jsonBody.AbstractURL
      )
      webSocket.send(respPayload)
    }
  })
}
