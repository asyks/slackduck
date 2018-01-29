'use strict'

const { Requester } = require("node-duckduckgo");
const requester = new Requester("node-slackduck");

requester.no_html = 1

function send_request(query_str) {

    requester.request(query_str, (err, response, body) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("DuckDuckGo response recieved");

        var json_body = JSON.parse(body)
        var result_url = json_body.AbstractURL

        console.log(json_body.AbstractURL);

        return result_url
    });
}

module.exports = send_request
