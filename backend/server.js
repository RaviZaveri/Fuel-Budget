const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conversion constants
const KM_TO_MILES = 0.621371;
const L_TO_GALLONS = 0.264172;

// Calculate fuel cost endpoint
app.post('/api/calculate', (req, res) => {
    try {
        const { distance, efficiency, price, isRoundTrip, distanceUnit, volumeUnit, budgetThreshold } = req.body;

        // Default to metric if not specified
        const distUnit = distanceUnit || 'km';
        const volUnit = volumeUnit || 'L';
        // Default budget threshold is $100
        const budget = budgetThreshold >= 0 ? budgetThreshold : 100;

        // Convert to metric (km and L) for internal calculation
        let distanceInKm = distance;
        let efficiencyInLPer100km = efficiency;

        if (distUnit === 'miles') {
            // Convert miles to km
            distanceInKm = distance * (1 / KM_TO_MILES); // miles / 0.621371 = km
        }

        if (volUnit === 'gallons') {
            // Convert MPG (miles/gallon) to L/100km
            // If input is MPG, convert: L/100km = 235.215 / MPG
            efficiencyInLPer100km = 235.215 / efficiency;
        }

        // Validation (using metric values)
        if (distanceInKm === undefined || distanceInKm === null || distanceInKm < 0) {
            return res.status(400).json({ 
                error: "Distance must be greater than or equal to 0" 
            });
        }
        if (efficiencyInLPer100km === undefined || efficiencyInLPer100km === null || efficiencyInLPer100km < 0) {
            return res.status(400).json({ 
                error: "Fuel efficiency must be greater than or equal to 0" 
            });
        }
        if (price === undefined || price === null || price < 0) {
            return res.status(400).json({ 
                error: "Fuel price must be greater than or equal to 0" 
            });
        }

        // Calculate total distance in km
        const totalDistanceKm = isRoundTrip ? distanceInKm * 2 : distanceInKm;

        // Calculate total fuel needed in liters (L/100km * km / 100)
        const totalFuelLiters = (totalDistanceKm * efficiencyInLPer100km) / 100;

        // Calculate total cost
        // If input is in gallons, convert fuel to gallons for cost calculation
        let totalFuelInInputUnit = totalFuelLiters;
        if (volUnit === 'gallons') {
            totalFuelInInputUnit = totalFuelLiters * L_TO_GALLONS;
        }
        const totalCost = totalFuelInInputUnit * price;

        // Calculate cost per unit distance
        const costPerKm = totalDistanceKm > 0 ? totalCost / totalDistanceKm : 0;

        // Convert outputs based on requested unit
        let outputDistance, outputFuel, outputCostPerDistance, distanceLabel, fuelLabel;

        if (distUnit === 'miles') {
            outputDistance = totalDistanceKm * KM_TO_MILES;
            outputCostPerDistance = costPerKm * KM_TO_MILES;
            distanceLabel = 'miles';
        } else {
            outputDistance = totalDistanceKm;
            outputCostPerDistance = costPerKm;
            distanceLabel = 'km';
        }

        if (volUnit === 'gallons') {
            outputFuel = totalFuelLiters * L_TO_GALLONS;
            fuelLabel = 'gallons';
        } else {
            outputFuel = totalFuelLiters;
            fuelLabel = 'L';
        }

        // Determine budget status using custom threshold
        const status = totalCost < budget ? "Budget Friendly" : "Not Budget Friendly";

        res.json({
            totalDistance: Math.round(outputDistance * 100) / 100,
            totalFuel: Math.round(outputFuel * 100) / 100,
            totalCost: Math.round(totalCost * 100) / 100,
            costPerDistance: Math.round(outputCostPerDistance * 100) / 100,
            status,
            budgetThreshold: budget,
            units: {
                distance: distanceLabel,
                volume: fuelLabel
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Fuel Efficiency Buddy API is running' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;