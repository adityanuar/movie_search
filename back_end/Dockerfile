# Pull the Node image from Docker Hub
FROM node:18.6.0-buster

# Setting Working Directory
WORKDIR /usr/app

# Copying only package.json
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy rest of the code to container
COPY . .

EXPOSE 8000

CMD ["npm", "start"]