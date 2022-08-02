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

EXPOSE 3000

ADD start.sh /
RUN chmod +x /start.sh

CMD ["/start.sh"]