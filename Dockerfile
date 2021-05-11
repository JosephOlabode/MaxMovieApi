# Specifying the node base image
FROM node:12.22.1
# define working directory for docker
WORKDIR /app
# Copy our package.json file to our working directory
COPY /app/package.json .
# Installing all the dependencies
RUN npm install
# Copy project files into the working directory
COPY /app .
# Expose port to access the application from localhost
EXPOSE 3000
# command to start our server
CMD [ "npm", "start" ]