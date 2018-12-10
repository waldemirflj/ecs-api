# Grab the latest node image
FROM node:8.14.0-alpine

# Set the working directory inside the container to /app
WORKDIR /app

# Add the .env to the directory (We need those variables)
# Add package.json to the directory
COPY [".env", "api/package.json", "./"]

# Install dependencies
RUN npm i -g @adonisjs/cli \
    && npm i

# Copy the rest into directory
COPY api/ .

# Expose port defined in .env file
EXPOSE ${PORT}

COPY docker-entrypoint.sh .

RUN ["chmod", "+x", "/app/docker-entrypoint.sh"]

# Start the app inside the container
ENTRYPOINT ["/app/docker-entrypoint.sh"] 