FROM node:latest

# install nodemon for development
RUN npm install --global nodemon

# Create directory
WORKDIR /usr/src

# Install app dependencies
COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json .

RUN npm install

# Bundle app source
WORKDIR /usr/src/app
COPY ./app .

RUN pwd
RUN ls -l .

EXPOSE 8080
CMD [ "nodemon", "./server.js" ]
