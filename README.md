# Fuel Efficiency Buddy ⛽

A web application that helps road trip planners calculate fuel costs and determine if their trip is "Budget Friendly" based on current gas prices.

## 📋 Overview

**Fuel Efficiency Buddy** makes trip planning easier by providing quick fuel cost estimates. Whether you're planning a weekend getaway or a cross-country adventure, this tool helps you understand your fuel expenses upfront.

### Key Features
- ✅ Calculate total fuel cost for any trip
- ✅ Support for both metric (km, L) and imperial (miles, MPG) units
- ✅ Customizable budget thresholds
- ✅ Round-trip calculation
- ✅ Real-time calculations with instant feedback
- ✅ Clean, responsive web interface

## 🏗️ Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **Testing** | Custom JavaScript test runner & Jest |
| **API** | RESTful JSON API |

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Fuel-Budget.git
   cd Fuel-Budget
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Start the backend server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`

4. **Open the frontend**
   - Open `frontend/index.html` in your web browser
   - Or run a local server: `python -m http.server 8000` from the project root

## 📖 Usage

### Web Interface
1. Enter your **one-way distance**
2. Enter your vehicle's **fuel efficiency**
3. Enter the **current fuel price**
4. The app will calculate:
   - Total fuel cost for your round trip
   - Whether the trip is "Budget Friendly" (under $100)

### API Endpoint

**POST** `/api/calculate`

**Request Body:**
```json
{
  "distance": 500,
  "efficiency": 10,
  "price": 1.50,
  "isRoundTrip": true,
  "distanceUnit": "km",
  "volumeUnit": "L",
  "budgetThreshold": 100
}
```

**Parameters:**
- `distance` (number, required): One-way trip distance
- `efficiency` (number, required): Fuel efficiency (L/100km or MPG)
- `price` (number, required): Fuel price per liter or gallon
- `isRoundTrip` (boolean, optional): Calculate for round trip (default: true)
- `distanceUnit` (string, optional): "km" or "miles" (default: "km")
- `volumeUnit` (string, optional): "L" or "gallons" (default: "L")
- `budgetThreshold` (number, optional): Budget limit in dollars (default: 100)

**Response:**
```json
{
  "totalCost": 150.00,
  "isBudgetFriendly": false,
  "distance": 1000,
  "fuelNeeded": 100,
  "message": "Your trip will cost $150.00"
}
```

**Example cURL Request:**
```bash
curl -X POST http://localhost:3000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "distance": 500,
    "efficiency": 10,
    "price": 1.50,
    "isRoundTrip": true
  }'
```

## 📁 Project Structure

```
Fuel-Budget/
├── frontend/
│   └── index.html              # Web interface
├── backend/
│   ├── server.js               # Express API server
│   ├── package.json            # Dependencies
│   └── tests/
│       └── calculator.test.js  # Test suite
├── features/
│   └── fuel-efficiency.feature # BDD feature specifications
├── PRESENTATION.md             # Project documentation
└── README.md                   # This file
```

## 🧪 Testing

### Run Tests
```bash
cd backend
npm test
```

Or use the VS Code task:
```bash
npm run test:watch
```

### Test Coverage
The test suite validates:
- Fuel cost calculations for metric and imperial units
- Round-trip calculations
- Budget threshold comparisons
- Input validation and error handling

## 📊 Calculation Example

**Scenario:** 500 km one-way trip, 10 L/100km efficiency, $1.50/L fuel

```
Distance (round trip):  1000 km
Fuel efficiency:        10 L/100km
Fuel needed:           (1000 / 100) × 10 = 100 L
Fuel price:             $1.50/L
Total cost:             100 × $1.50 = $150.00

Status: NOT Budget Friendly (exceeds $100 threshold)
```

## 🔄 Supported Conversions

- **Distance:** km ↔ miles (1 km = 0.621371 miles)
- **Volume:** L ↔ gallons (1 L = 0.264172 gallons)
- **Efficiency:** L/100km ↔ MPG (L/100km = 235.215 / MPG)

## 🛠️ Development

### API Development Tips
- Backend runs with CORS enabled for cross-origin requests
- All calculations use metric units internally
- Input validation catches invalid data before processing

### Extending the App
- Add more vehicle profiles with average efficiency ratings
- Integrate real-time fuel price APIs
- Add trip history and expense tracking
- Create mobile app version

## 📝 User Story

> As a road trip planner, I want a tool that calculates the cost-per-kilometer for my vehicle and suggests whether a planned trip is 'Budget Friendly' based on current gas prices, so that I can manage my travel expenses.

### Acceptance Criteria
- ✅ Calculate total trip cost given distance, fuel efficiency, and fuel price
- ✅ Provide a 'Budget Friendly' status when total fuel cost is **less than $100**

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Created as a road trip planning helper for budget-conscious travelers.

---

**Happy trip planning! 🚗💨**
