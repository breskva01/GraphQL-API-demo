#!/bin/bash

echo "Starting project setup..."

echo "Installing dependencies..."
npm install || { echo "Failed to install dependencies! Exiting..."; exit 1; }

cd src || { echo "src directory not found! Exiting..."; exit 1; }
echo "Launching the application..."
node index.js