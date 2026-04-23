# Fuel Efficiency Buddy - Project Presentation

## 📋 Project Overview

**Fuel Efficiency Buddy** is a web application that helps road trip planners calculate fuel costs and determine if their trip is "Budget Friendly" based on current gas prices.

---

## 🎯 User Story

> As a road trip planner, I want a tool that calculates the cost-per-kilometer for my vehicle and suggests whether a planned trip is 'Budget Friendly' based on current gas prices, so that I can manage my travel expenses.

### Acceptance Criteria
- Given distance, fuel efficiency (L/100km), and fuel price ($/L), the tool must calculate total trip cost
- Provide a 'Budget Friendly' status when total fuel cost is **less than $100** for the entire round trip

### Test Case (Main User Story)
| Input | Value |
|-------|-------|
| Distance (one-way) | 500 km |
| Total Distance | 1000 km (round trip) |
| Fuel Efficiency | 10 L/100km |
| Fuel Price | $1.50/L |
| **Expected Total Cost** | **$150.00** |
| **Expected Status** | **Not Budget Friendly** |

---

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐
│   Frontend      │────▶│   Backend       │
│   (HTML/CSS/JS) │     │   (Node.js)     │
│   Port: -       │     │   Port: 3000    │
└─────────────────┘     └─────────────────┘
```

### Technology Stack
| Layer | Technology |
|-------|------------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Testing | Custom JavaScript test runner |

---

## 📁 Project Structure

```
fuel-efficiency-buddy/
├── features/
│   └── fuel-efficiency.feature    # Gherkin feature file
├── backend/
│   ├── server.js                  # Express API server
│   ├── package.json               # Dependencies
│   └── tests/
│       └── calculator.test.js     # Test cases
└── frontend/
    └── index.html                 # User interface
```

---

## 🔧 Tools & Commands Used

### 1. Project Setup
```bash
# Create project directories
mkdir -p features backend/tests frontend

# Initialize backend
cd backend
npm init -y
npm install express cors
```

### 2. Backend Development
```bash
# Start backend server
cd backend
node server.js

# Server runs on: http://localhost:3000
```

### 3. API Endpoint
```bash
# POST /api/calculate
curl -X POST http://localhost:3000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "distance": 500,
    "efficiency": 10,
    "price": 1.50,
    "isRoundTrip": true
  }'
```

### 4. Running Tests
```bash
# Execute test cases
cd backend
node tests/calculator.test.js
```

### 5. Frontend
```bash
# Open in browser
# Simply open frontend/index.html in a web browser
```

---

## ✅ Test Results

All 8 test cases passed:

| # | Test Case | Result |
|---|-----------|--------|
| 1 | Round trip - Budget Friendly | ✅ PASS |
| 2 | Round trip - Not Budget Friendly (User Story) | ✅ PASS |
| 3 | One-way trip - Budget Friendly | ✅ PASS |
| 4 | Cost per kilometer calculation | ✅ PASS |
| 5 | Edge case - Zero distance | ✅ PASS |
| 6 | Edge case - Zero fuel efficiency | ✅ PASS |
| 7 | Edge case - Zero fuel price | ✅ PASS |
| 8 | Boundary test - $100 threshold | ✅ PASS |

---

## 📊 Calculation Logic

### Formulas Used:
```
Total Distance = One-way Distance × 2 (if round trip)
Total Fuel (L) = Total Distance × (Efficiency / 100)
Total Cost     = Total Fuel × Price per Liter
Cost per km    = Total Cost / Total Distance
```

### Budget Status:
```
if Total Cost < $100  → "Budget Friendly"
if Total Cost >= $100 → "Not Budget Friendly"
```

---

## 🚀 How to Run

1. **Start Backend:**
   ```bash
   cd backend
   node server.js
   ```

2. **Open Frontend:**
   - Navigate to `frontend/index.html` in your browser
   - Or use a simple HTTP server:
   ```bash
   npx serve frontend
   ```

3. **Test the Application:**
   - Enter distance (one-way): 500
   - Select: Round Trip
   - Enter efficiency: 10
   - Enter price: 1.50
   - Click "Calculate Fuel Cost"
   - Result: $150.00, Status: "Not Budget Friendly" ✅

---

## 📝 Gherkin Feature File

Created `features/fuel-efficiency.feature` with scenarios:
- Calculate fuel cost for round trip - Budget Friendly
- Calculate fuel cost for round trip - Not Budget Friendly
- Calculate fuel cost for one-way trip
- Calculate cost per kilometer
- Edge cases: Zero distance, Zero efficiency, Zero price

---

## 🎨 Frontend Features

- Toggle between **One Way** and **Round Trip**
- Input fields for distance, fuel efficiency, and fuel price
- Real-time calculation via backend API
- Visual status indicator (green for Budget Friendly, red for Not Budget Friendly)
- Responsive design with gradient background

---

## 📌 Key Decisions

1. **Simple Architecture**: Separate frontend and backend for clarity
2. **API-First**: Frontend communicates with backend via REST API
3. **Strict Budget Threshold**: < $100 = Budget Friendly (not ≤)
4. **Validation**: Backend validates all inputs before calculation
5. **Rounding**: Results rounded to 2 decimal places for currency display

---

## ✅ Summary

| Item | Status |
|------|--------|
| Gherkin Feature File | ✅ Created |
| Backend API | ✅ Running on port 3000 |
| Frontend UI | ✅ Complete |
| Test Cases | ✅ 8/8 Passed |
| User Story Test | ✅ $150, Not Budget Friendly |
| Presentation | ✅ Complete |

---

*Generated: April 22, 2026*