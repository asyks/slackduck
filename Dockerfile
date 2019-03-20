FROM node:10.15.3-alpine

# Create and change to app directory
WORKDIR /usr/src/app

# Copy package.json to container
COPY package.json .
COPY package-lock.json .

# Install nodemon for development
RUN npm install --global nodemon

# Install app dependencies
RUN npm install

# Explose port 8080 on the container
EXPOSE 8080
