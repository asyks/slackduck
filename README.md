# Slackipedia

## Building and Running Slackipedia

Build

`$ docker build -t slackipedia --force-rm .`

Run, remapping port 8080 to port 49160 (or any other of your choosing) on localhost

`$ docker run -p 49160:8080 -d slackipedia`

Follow logs

`$ docker logs --follow <container-id>`

Kill (before rebuilding)

`$ docker kill $(docker ps -q)`

### Running locally with ngrok

Slack uses Oauth2 for RTM API authentication, so in order to test locally
you have to have a port on your local machine exposed. One easy way to 
accomplish that is by using ngrok. You can download ngrock here - https://ngrok.com/download.
To run ngrock to test slackipedia use the following command.

`$ ngrok http 49160`
