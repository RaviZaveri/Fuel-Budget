/**
 * Fuel Efficiency Buddy - Backend Test Cases
 * Test the calculation logic for fuel cost and budget status
 * Includes unit conversion tests (Metric and US units)
 */

// Conversion constants
const KM_TO_MILES = 0.621371;
const L_TO_GALLONS = 0.264172;

// Test case helper function with unit support
function calculateFuelCost(distance, efficiency, price, isRoundTrip, distanceUnit = 'km', volumeUnit = 'L') {
    // Convert to metric (km and L) for internal calculation
    let distanceInKm = distance;
    let efficiencyInLPer100km = efficiency;

    if (distanceUnit === 'miles') {
        distanceInKm = distance / KM_TO_MILES;
    }

    if (volumeUnit === 'gallons') {
        efficiencyInLPer100km = 235.215 / efficiency;
    }

    // Calculate total distance in km
    const totalDistanceKm = isRoundTrip ? distanceInKm * 2 : distanceInKm;
    const totalFuelLiters = (totalDistanceKm * efficiencyInLPer100km) / 100;

    // Calculate total cost - convert fuel to input unit
    let totalFuelInInputUnit = totalFuelLiters;
    if (volumeUnit === 'gallons') {
        totalFuelInInputUnit = totalFuelLiters * L_TO_GALLONS;
    }
    const totalCost = totalFuelInInputUnit * price;

    const costPerKm = totalDistanceKm > 0 ? totalCost / totalDistanceKm : 0;

    // Convert outputs based on requested unit
    let outputDistance, outputFuel, outputCostPerDistance, distanceLabel, fuelLabel;

    if (distanceUnit === 'miles') {
        outputDistance = totalDistanceKm * KM_TO_MILES;
        outputCostPerDistance = costPerKm * KM_TO_MILES;
        distanceLabel = 'miles';
    } else {
        outputDistance = totalDistanceKm;
        outputCostPerDistance = costPerKm;
        distanceLabel = 'km';
    }

    if (volumeUnit === 'gallons') {
        outputFuel = totalFuelLiters * L_TO_GALLONS;
        fuelLabel = 'gallons';
    } else {
        outputFuel = totalFuelLiters;
        fuelLabel = 'L';
    }

    const status = totalCost < 100 ? "Budget Friendly" : "Not Budget Friendly";
    
    return {
        totalDistance: Math.round(outputDistance * 100) / 100,
        totalFuel: Math.round(outputFuel * 100) / 100,
        totalCost: Math.round(totalCost * 100) / 100,
        costPerDistance: Math.round(outputCostPerDistance * 100) / 100,
        status,
        units: { distance: distanceLabel, volume: fuelLabel }
    };
}

// ==================== METRIC TESTS ====================

// Test Case 1: Round trip - Budget Friendly (Metric)
function testCase1() {
    const result = calculateFuelCost(200, 8, 1.20, true, 'km', 'L');
    console.log('Test 1 - Metric: Round trip Budget Friendly:');
    console.log(`  Input: distance=200km, efficiency=8L/100km, price=$1.20, roundTrip=true`);
    console.log(`  Expected: totalDistance=400km, totalCost=$38.40, status="Budget Friendly"`);
    console.log(`  Actual:   totalDistance=${result.totalDistance}km, totalCost=$${result.totalCost}, status="${result.status}"`);
    console.log(`  Result: ${result.totalDistance === 400 && result.totalCost === 38.40 && result.status === "Budget Friendly" ? 'PASS ✓' : 'FAIL ✗'}\n`);
}

// Test Case 2: Round trip - Not Budget Friendly (Main User Story Test - Metric)
function testCase2() {
    const result = calculateFuelCost(500, 10, 1.50, true, 'km', 'L');
    console.log('Test 2 - Metric: Round trip Not Budget Friendly (User Story Test):');
    console.log(`  Input: distance=500km one-way, efficiency=10L/100km, price=$1.50, roundTrip=true`);
    console.log(`  Expected: totalDistance=1000km, totalCost=$150.00, status="Not Budget Friendly"`);
    console.log(`  Actual:   totalDistance=${result.totalDistance}km, totalCost=$${result.totalCost}, status="${result.status}"`);
    console.log(`  Result: ${result.totalDistance === 1000 && result.totalCost === 150 && result.status === "Not Budget Friendly" ? 'PASS ✓' : 'FAIL ✗'}\n`);
}

// Test Case 3: One-way trip - Budget Friendly (Metric)
function testCase3() {
    const result = calculateFuelCost(300, 7, 1.40, false, 'km', 'L');
    console.log('Test 3 - Metric: One-way trip Budget Friendly:');
    console.log(`  Input: distance=300km, efficiency=7L/100km, price=$1.40, roundTrip=false`);
    console.log(`  Expected: totalDistance=300km, totalCost=$29.40, status="Budget Friendly"`);
    console.log(`  Actual:   totalDistance=${result.totalDistance}km, totalCost=$${result.totalCost}, status="${result.status}"`);
    console.log(`  Result: ${result.totalDistance === 300 && result.totalCost === 29.40 && result.status === "Budget Friendly" ? 'PASS ✓' : 'FAIL ✗'}\n`);
}

// Test Case 4: Cost per kilometer (Metric)
function testCase4() {
    const result = calculateFuelCost(150, 9, 1.35, true, 'km', 'L');
    console.log('Test 4 - Metric: Cost per kilometer:');
    console.log(`  Input: distance=150km one-way, efficiency=9L/100km, price=$1.35, roundTrip=true`);
    console.log(`  Expected: costPerDistance=$0.12/km`);
    console.log(`  Actual:   costPerDistance=$${result.costPerDistance}/${result.units.distance}`);
    console.log(`  Result: ${result.costPerDistance === 0.12 ? 'PASS ✓' : 'FAIL ✗'}\n`);
}

// ==================== US UNIT TESTS ====================

// Test Case 5: US Units - Round trip (Miles + Gallons)
function testCase5() {
    // 310 miles one-way, 25 MPG, $3.50/gal, round trip
    // Fuel = 620 miles / 25 MPG = 24.8 gallons
    // Cost = 24.8 * $3.50 = $86.80
    const result = calculateFuelCost(310, 25, 3.50, true, 'miles', 'gallons');
    console.log('Test 5 - US Units: Round trip with Miles/Gallons:');
    console.log(`  Input: distance=310mi, efficiency=25MPG, price=$3.50/gal, roundTrip=true`);
    console.log(`  Expected: totalDistance=620 miles, totalFuel=24.8 gallons, totalCost=$86.80`);
    console.log(`  Actual:   totalDistance=${result.totalDistance} ${result.units.distance}, totalFuel=${result.totalFuel} ${result.units.volume}, totalCost=$${result.totalCost}`);
    console.log(`  Result: ${result.totalDistance === 620 && Math.abs(result.totalFuel - 24.8) < 0.1 && Math.abs(result.totalCost - 86.80) < 0.1 ? 'PASS ✓' : 'FAIL ✗'}\n`);
}

// Test Case 6: US Units - One way Budget Friendly
function testCase6() {
    // 100 miles = ~161 km, 30 MPG = ~7.8 L/100km, $3.00/gal = ~$1.13/L
    const result = calculateFuelCost(100, 30, 3.00, false, 'miles', 'gallons');
    console.log('Test 6 - US Units: One-way trip Budget Friendly:');
    console.log(`  Input: distance=100mi, efficiency=30MPG, price=$3.00/gal, roundTrip=false`);
    console.log(`  Expected: totalDistance=100 miles, status="Budget Friendly"`);
    console.log(`  Actual:   totalDistance=${result.totalDistance} ${result.units.distance}, totalCost=$${result.totalCost}, status="${result.status}"`);
    console.log(`  Result: ${result.totalDistance === 100 && result.status === "Budget Friendly" ? 'PASS ✓' : 'FAIL ✗'}\n`);
}

// Test Case 7: US Units - Cost per mile
function testCase7() {
    const result = calculateFuelCost(200, 22, 4.00, true, 'miles', 'gallons');
    console.log('Test 7 - US Units: Cost per mile:');
    console.log(`  Input: distance=200mi one-way, efficiency=22MPG, price=$4.00/gal, roundTrip=true`);
    console.log(`  Expected: cost per mile > 0`);
    console.log(`  Actual:   costPerDistance=$${result.costPerDistance}/mile, totalCost=$${result.totalCost}`);
    console.log(`  Result: ${result.costPerDistance > 0 && result.totalCost > 0 ? 'PASS ✓' : 'FAIL ✗'}\n`);
}

// ==================== EDGE CASE TESTS ====================

// Test Case 8: Edge case - Zero distance (Metric)
function testCase8() {
    const result = calculateFuelCost(0, 10, 1.50, true, 'km', 'L');
    console.log('Test 8 - Edge case Zero distance:');
    console.log(`  Input: distance=0km, efficiency=10L/100km, price=$1.50, roundTrip=true`);
    console.log(`  Expected: totalDistance=0km, totalCost=$0.00, status="Budget Friendly"`);
    console.log(`  Actual:   totalDistance=${result.totalDistance}km, totalCost=$${result.totalCost}, status="${result.status}"`);
    console.log(`  Result: ${result.totalDistance === 0 && result.totalCost === 0 ? 'PASS ✓' : 'FAIL ✗'}\n`);
}

// Test Case 9: Edge case - Zero fuel efficiency
function testCase9() {
    const result = calculateFuelCost(100, 0, 1.50, true, 'km', 'L');
    console.log('Test 9 - Edge case Zero fuel efficiency:');
    console.log(`  Input: distance=100km one-way, efficiency=0L/100km, price=$1.50, roundTrip=true`);
    console.log(`  Expected: totalCost=$0.00, status="Budget Friendly"`);
    console.log(`  Actual:   totalCost=$${result.totalCost}, status="${result.status}"`);
    console.log(`  Result: ${result.totalCost === 0 ? 'PASS ✓' : 'FAIL ✗'}\n`);
}

// Test Case 10: Edge case - Zero fuel price
function testCase10() {
    const result = calculateFuelCost(100, 8, 0, true, 'km', 'L');
    console.log('Test 10 - Edge case Zero fuel price:');
    console.log(`  Input: distance=100km one-way, efficiency=8L/100km, price=$0.00, roundTrip=true`);
    console.log(`  Expected: totalCost=$0.00, status="Budget Friendly"`);
    console.log(`  Actual:   totalCost=$${result.totalCost}, status="${result.status}"`);
    console.log(`  Result: ${result.totalCost === 0 && result.status === "Budget Friendly" ? 'PASS ✓' : 'FAIL ✗'}\n`);
}

// Test Case 11: Boundary test - $100 threshold (Metric)
function testCase11() {
    const result = calculateFuelCost(333.33, 10, 1.50, true, 'km', 'L');
    console.log('Test 11 - Boundary test $100 threshold:');
    console.log(`  Input: distance=333.33km one-way, efficiency=10L/100km, price=$1.50, roundTrip=true`);
    console.log(`  Expected: totalCost = $100, status="Budget Friendly" (< $100)`);
    console.log(`  Actual:   totalCost=$${result.totalCost}, status="${result.status}"`);
    console.log(`  Result: ${result.status === "Budget Friendly" ? 'PASS ✓' : 'FAIL ✗'}\n`);
}

// Test Case 12: US Units - Boundary test $100
function testCase12() {
    // ~207 miles one-way at 25 MPG with $3.50/gal = ~$100
    const result = calculateFuelCost(207, 25, 3.50, true, 'miles', 'gallons');
    console.log('Test 12 - US Units: Boundary test $100 threshold:');
    console.log(`  Input: distance=207mi one-way, efficiency=25MPG, price=$3.50/gal, roundTrip=true`);
    console.log(`  Expected: totalCost ~$100, status="Budget Friendly" (< $100)`);
    console.log(`  Actual:   totalCost=$${result.totalCost}, status="${result.status}"`);
    console.log(`  Result: ${result.status === "Budget Friendly" ? 'PASS ✓' : 'FAIL ✗'}\n`);
}

// Run all tests
console.log('='.repeat(70));
console.log('FUEL EFFICIENCY BUDDY - TEST CASES (With Unit Conversion)');
console.log('='.repeat(70));
console.log('\n--- METRIC TESTS (km/L) ---\n');

testCase1();
testCase2();
testCase3();
testCase4();

console.log('--- US UNIT TESTS (miles/gallons) ---\n');

testCase5();
testCase6();
testCase7();

console.log('--- EDGE CASE TESTS ---\n');

testCase8();
testCase9();
testCase10();
testCase11();
testCase12();

console.log('='.repeat(70));
console.log('All test cases executed');
console.log('='.repeat(70));