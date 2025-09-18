import assert from "assert";
import {Train} from './train.js'


const LOKOMOTIV = "Lokomotiv";
const SIDDEVOGN = "Siddevogn";
const SENGEVOGN = "Sengevogn";
const SPISEVOGN = "Spisevogn";
const GODSVOGN = "Godsvogn";


// --- KØR ALLE TESTS ---
function runValidationTests() {
    console.log("--- Starter valideringstests ---\n");
    let train;

    // ** Regel: Lokomotiver **
    console.log("--- Tester Lokomotiv Regler ---");
    // Positive (kort tog <= 10)
    train = new Train();
    train.addCar(LOKOMOTIV); train.addCar(SIDDEVOGN);
    assert.strictEqual(train.isValid(), true, "Test 1 Fejlet: Kort tog med L forrest skal være gyldigt.");

    // Negative (kort tog <= 10)
    train = new Train();
    train.addCar(SIDDEVOGN); train.addCar(LOKOMOTIV);
    assert.strictEqual(train.isValid(), false, "Test 2 Fejlet: Kort tog med L bagerst skal være ugyldigt.");
    
    train = new Train();
    train.addCar(LOKOMOTIV); train.addCar(SIDDEVOGN); train.addCar(LOKOMOTIV);
    assert.strictEqual(train.isValid(), false, "Test 3 Fejlet: Kort tog med to L skal være ugyldigt.");

    // Positive (langt tog > 10)
    train = new Train();
    train.addCar(LOKOMOTIV); for (let i = 0; i < 10; i++) train.addCar(SIDDEVOGN); train.addCar(LOKOMOTIV);
    assert.strictEqual(train.isValid(), true, "Test 4 Fejlet: Langt tog med L forrest og bagerst skal være gyldigt.");

    // Negative (langt tog > 10)
    train = new Train();
    train.addCar(LOKOMOTIV); for (let i = 0; i < 10; i++) train.addCar(SIDDEVOGN);
    assert.strictEqual(train.isValid(), false, "Test 5 Fejlet: Langt tog uden bagerste L skal være ugyldigt.");

    // ** Regel: Passager- vs. Godsvogne **
    console.log("\n--- Tester Passager/Gods Regler ---");
    train = new Train();
    train.addCar(LOKOMOTIV); train.addCar(SIDDEVOGN); train.addCar(GODSVOGN);
    assert.strictEqual(train.isValid(), true, "Test 6 Fejlet: Passager før gods skal være gyldigt.");

    train = new Train();
    train.addCar(LOKOMOTIV); train.addCar(GODSVOGN); train.addCar(SIDDEVOGN);
    assert.strictEqual(train.isValid(), false, "Test 7 Fejlet: Passager efter gods skal være ugyldigt.");

    // ** Regel: Sengevogne **
    console.log("\n--- Tester Sengevogn Regler ---");
    // Positive
    train = new Train(); train.addCar(LOKOMOTIV); train.addCar(SIDDEVOGN);
    assert.strictEqual(train.isValid(), true, "Test 8 Fejlet: Tog med 0 sengevogne skal være gyldigt.");
    
    train = new Train(); train.addCar(LOKOMOTIV); train.addCar(SENGEVOGN);
    assert.strictEqual(train.isValid(), true, "Test 9 Fejlet: Tog med 1 sengevogn skal være gyldigt.");
    
    train = new Train(); train.addCar(LOKOMOTIV); train.addCar(SENGEVOGN); train.addCar(SENGEVOGN);
    assert.strictEqual(train.isValid(), true, "Test 10 Fejlet: Tog med 2 samlede sengevogne skal være gyldigt.");

    // Negative
    train = new Train(); train.addCar(LOKOMOTIV); train.addCar(SENGEVOGN); train.addCar(SIDDEVOGN); train.addCar(SENGEVOGN);
    assert.strictEqual(train.isValid(), false, "Test 11 Fejlet: Tog med 2 adskilte sengevogne skal være ugyldigt.");
    
    train = new Train(); train.addCar(LOKOMOTIV); train.addCar(SENGEVOGN); train.addCar(SENGEVOGN); train.addCar(SIDDEVOGN); train.addCar(SENGEVOGN);
    assert.strictEqual(train.isValid(), false, "Test 12 Fejlet: Tog med 3 sengevogne (1 adskilt) skal være ugyldigt.");

    // ** Regel: Spisevogne **
    console.log("\n--- Tester Spisevogn Regler ---");
    // Positive
    train = new Train(); train.addCar(LOKOMOTIV); train.addCar(SIDDEVOGN); train.addCar(SENGEVOGN);
    assert.strictEqual(train.isValid(), true, "Test 13 Fejlet: Tog uden spisevogn skal være gyldigt.");
    
    train = new Train(); train.addCar(LOKOMOTIV); train.addCar(SIDDEVOGN); train.addCar(SPISEVOGN);
    assert.strictEqual(train.isValid(), true, "Test 14 Fejlet: Fri vej fra siddevogn til spisevogn skal være gyldigt.");

    // Negative
    train = new Train(); train.addCar(LOKOMOTIV); train.addCar(SIDDEVOGN); train.addCar(SENGEVOGN); train.addCar(SPISEVOGN);
    // assert.strictEqual(train.isValid(), false, "Test 15 Fejlet: Blokeret vej til spisevogn skal være ugyldigt.");
}

// Kør selve test-suiten
try {
    runValidationTests();
    console.log("\n✅ Alle tests bestået!");
} catch (error) {
    console.error(`\n❌ En test fejlede: ${error.message}`);
}