'use strict'

const { Requester } = require("node-duckduckgo");
const requester = new Requester("node-slackipedia");

function send_request(msg_data) {

    requester.request(msg_data.text)
        .on("data", (data) => {
            console.log("Data recieved");
            console.log(data.toString());
        })
        .on("error", (err) => {
            console.log("ERROR!");
            console.log(err);
        });
}

module.exports = send_request
