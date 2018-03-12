'use strict'

const req = require('request-promise')

module.exports.authOptions = authOptions
module.exports.rtmConnect = rtmConnect

function authOptions (queryCode) {
  return {
    method: 'POST',
    uri: 'https://slack.com/api/oauth.access?code=' +
      queryCode +
      '&client_id=' + process.env.CLIENT_ID +
      '&client_secret=' + process.env.CLIENT_SECRET +
      '&redirect_uri=' + process.env.REDIRECT_URI,
    json: true
  }
}

function rtmAuthOptions (token) {
  return {
    method: 'POST',
    uri: 'https://slack.com/api/rtm.connect',
    form: {
      'token': token
    },
    json: true
  }
}

function rtmConnect (token) {
  var options = rtmAuthOptions(token)

  return req(options)
}
