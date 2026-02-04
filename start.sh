#!/bin/bash

echo "Starting code execution system..."

if ! command -v docker &> /dev/null; then
    echo "Docker not installed"
    exit 1
fi

if ! docker info &> /dev/null; then
    echo "Docker not running"
    exit 1
fi

echo "Building containers..."
docker-compose up -d --build

echo "Waiting for services..."
sleep 10

echo ""
echo "Done! Open these:"
echo "  Playground:    http://localhost:8080"
echo "  API:           http://localhost:3000"
echo "  Queue Board:   http://localhost:3000/admin/queues"
echo "  Judge0:        http://localhost:2358"
echo ""
echo "Stop with: docker-compose down"
