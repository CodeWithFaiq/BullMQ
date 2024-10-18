# Dockerfile
# Use an official Node.js runtime as a base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5000 to the outside world
EXPOSE 5000

# Command to run the application
CMD ["node", "app.js"]
