# 1. Grab the latest node image
FROM node:8.14.0-alpine

# 2. Set the working directory inside the container to /app
WORKDIR /app

# 3. Add the .env to the directory (We need those variables)
ADD .env .

# 5. Add package.json to the directory
ADD api/package.json .

# 6. Install dependencies
RUN npm install

# 7. Copy the rest into directory
COPY api/ .

# 4. Expose port defined in .env file
EXPOSE ${PORT}

# 8. Start the app inside the container
CMD ["npm", "start"]