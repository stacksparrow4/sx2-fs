A simple file sharing service

# Setup

Copy `.env.example` to `.env` and fill in the password.

# Local development

Run `npm install`, then `node .` to start the server.

# Docker compose deployment

Run `docker compose up --build`

# Kubernetes deployment

Make any necessary edits to `deployment.yaml`, then run `kubectl apply -k .`
