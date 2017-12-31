FROM node:latest

# Install nodemon for development
RUN npm install --global nodemon

# Create and change to app directory
WORKDIR /usr/src/app

# Add package.json to container
ADD package.json .

# Install app dependencies
RUN npm install

# Explose port 8080 on the container
EXPOSE 8080
