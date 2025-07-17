#!/bin/bash

# Make the script exit on any error
set -e

# Run predeploy tasks (clean, clear cache, format)
echo "🧹 Running predeploy tasks..."
npm run predeploy

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the site
echo "🔨 Building the site..."
npm run build

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
  echo "🔧 Installing Netlify CLI..."
  npm install -g netlify-cli
fi

# Deploy to Netlify
echo "🚀 Deploying to Netlify..."
netlify deploy --prod --dir=public 