#!/bin/bash

# Script de prueba para simular un webhook de Fillout con 13 preguntas

echo "🧪 Enviando webhook de prueba con 13 preguntas..."

curl -X POST "https://semiprecious-unelastic-ronnie.ngrok-free.dev/api/fillout?secret=super_secret_123" \
  -H "Content-Type: application/json" \
  -d '{
    "formId": "ai_assessment_full",
    "formName": "Surfing Digital AI Assessment - 13 Questions",
    "submission": {
      "submissionId": "manual_test_'$(date +%s)'",
      "submissionTime": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'",
      "questions": [
        {
          "id": "1",
          "name": "Company Name",
          "value": "Acme Corporation",
          "type": "ShortAnswer"
        },
        {
          "id": "2",
          "name": "Website",
          "value": "https://acme.com",
          "type": "URLInput"
        },
        {
          "id": "3",
          "name": "Select your primary Industry",
          "value": "Technology & Software",
          "type": "Dropdown"
        },
        {
          "id": "4",
          "name": "Country",
          "value": "United States",
          "type": "Dropdown"
        },
        {
          "id": "5",
          "name": "Company size",
          "value": "50-249",
          "type": "Dropdown"
        },
        {
          "id": "6",
          "name": "Role",
          "value": "CEO",
          "type": "Dropdown"
        },
        {
          "id": "7",
          "name": "Work email",
          "value": "ceo@acme.com",
          "type": "EmailInput"
        },
        {
          "id": "8",
          "name": "Pick up up to 3 strategic threats",
          "value": ["Margin compression", "Rising customer churn risk", "Talent shortage"],
          "type": "MultipleChoice"
        },
        {
          "id": "9",
          "name": "What are your biggest problems as a business?",
          "value": "We are struggling with high customer churn and increasing operational costs. Our competitors are moving faster with AI implementation.",
          "type": "LongAnswer"
        },
        {
          "id": "10",
          "name": "Primary Goal with AI?",
          "value": "Reduce costs",
          "type": "Dropdown"
        },
        {
          "id": "11",
          "name": "Top KPI you want to move",
          "value": "Customer Lifetime Value (LTV)",
          "type": "Dropdown"
        },
        {
          "id": "12",
          "name": "Urgency for results",
          "value": "30d",
          "type": "Dropdown"
        },
        {
          "id": "13",
          "name": "What do you want to achieve with AI?",
          "value": "We want to implement AI to predict customer churn and automate our retention campaigns, aiming to increase LTV by 40% within 6 months.",
          "type": "LongAnswer"
        }
      ]
    }
  }' \
  --max-time 20 2>&1 | grep -v "^  %"

echo ""
echo "✅ Revisa la terminal de Next.js y Prisma Studio (http://localhost:5555)"

