#!/bin/bash

# Start the containers in detached mode
docker-compose -f docker-compose.yml -f runTests.yml up -d

# Run the tests and log the output to the terminal
docker-compose logs -f --no-log-prefix study-schedule-backend-container

# Stop all containers when the tests are complete or when the backend-service container exits
docker-compose -f docker-compose.yml down
