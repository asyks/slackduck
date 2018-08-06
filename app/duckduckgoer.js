'use strict'

const { Requester } = require('node-duckduckgo')

const slacksocket = require('./slacksocket')

module.exports = sendDuckRequest

const requester = new Requester('node-slackduck')
requester.no_html = 1

function sendDuckRequest (webSocket, msgChannel, queryTerm) {
  requester.request(queryTerm, function (err, response, body) {
    if (err) {
      console.log(err)
    } else {
      console.log('DuckDuckGo response recieved')

      try {
        var jsonBody = JSON.parse(body)
      }
      catch(err) {
        if (err instanceof SyntaxError) {
          console.log('DuckDuckGo response not valid json')
        }
        else {
          console.log('DuckDuckGo response error')
        }
      }

      console.log(jsonBody)

      var respPayload = slacksocket.responsePayload(
        msgChannel, jsonBody.AbstractURL
      )
      webSocket.send(respPayload)
    }
  })
}
