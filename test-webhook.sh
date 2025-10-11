#!/bin/bash

# Test Fillout Webhook
# Usage: ./test-webhook.sh

echo "🧪 Testing Fillout Webhook..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test GET request (health check)
echo -e "${BLUE}1. Testing health check (GET /api/fillout)${NC}"
curl -s "http://localhost:3000/api/fillout?secret=super_secret_123" | jq '.'
echo ""
echo ""

# Test POST request without secret (should fail)
echo -e "${BLUE}2. Testing webhook without secret (should fail)${NC}"
curl -s -X POST http://localhost:3000/api/fillout \
  -H "Content-Type: application/json" \
  -d @test-fillout-webhook.json | jq '.'
echo ""
echo ""

# Test POST request with sample data and secret
echo -e "${BLUE}3. Testing webhook with secret (POST /api/fillout?secret=...)${NC}"
curl -s -X POST "http://localhost:3000/api/fillout?secret=super_secret_123" \
  -H "Content-Type: application/json" \
  -d @test-fillout-webhook.json | jq '.'
echo ""
echo ""

echo -e "${GREEN}✅ Test complete!${NC}"
echo ""
echo "Check your database:"
echo "  npx prisma studio"

