# Use an official Node runtime as a parent image
FROM node:18 

# Set the working directory to /app
WORKDIR /app

#Copy package.json file to the working directory
COPY package*.json ./

RUN apt-get update && apt-get install -y ffmpeg

# Install any needed packages specified in requirements.txt
RUN npm install

#Copy app source inside the docker image
COPY . .

#Make PORT 3000 available to the world outside this container
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD ["npm", "start"]