# slackduck

## Prerequisites

Docker and docker-compose for local testing

ngrok (https://ngrok.com/) for local manual testing

dotenv (https://www.npmjs.com/package/dotenv) file with the following vars:

* CLIENT_ID - slack api app client id
* CLIENT_SECRET - slack api app client secret
* REDIRECT_URI - an oauth redirect url (ngrok url for local testing)

## Building and Running slackduck

Build using docker-compose

`$ docker-compose build --force-rm`

Run, using docker-compose

`$ docker-compose up`

Or run in daemon mode, and follow logs

`$ docker-compose up -d`

`$ docker logs -f slackduck_web_1`

Removing stopped containers with docker-compose

`$ docker-compose rm`

Kill running containers (if necessary before rebuilding)

`$ docker kill $(docker ps -q)`

Remove docker images

`$ docker rmi -f $(docker images -q)`

### Running locally with ngrok

Slack uses Oauth2 for RTM API authentication, so in order to test locally
you have to have a port on your local machine exposed. One easy way to 
accomplish that is by using ngrok. You can download ngrock here - https://ngrok.com/download.
To run ngrock to test slackduck use the following command.

`$ ngrok http 49160`
