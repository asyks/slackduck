# Slackipedia

## Building and Running Slackipedia

Build

`$ docker build -t slackipedia --force-rm .`

Run

`$ docker run -p 49160:8080 -d slackipedia`

Follow logs

`$ docker logs --follow <container-id>`

Kill (before rebuilding)

`$ docker kill $(docker ps -q)`
