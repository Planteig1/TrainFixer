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
// --- Hjælpefunktion til at konvertere et linkedList tog til array ---
function getTrainAsArray(linkedList) {
    const result = [];
    let current = linkedList.head;
    while (current) {
        result.push(current.data);
        current = current.next;
    }
    return result;
}


// --- Test-suite for fixTrain ---
function runFixTrainTests() {
    console.log("--- Starter tests for fixTrain ---\n");
    let train, fixedTrain, expectedOrder;

    // Test 1: Fjerner overflødigt lokomotiv fra et kort tog
    train = new Train();
    ['Lokomotiv', 'Siddevogn', 'Lokomotiv'].forEach(c => train.addCar(c));
    fixedTrain = train.fixTrain();
    expectedOrder = ['Lokomotiv', 'Siddevogn'];
    assert.deepStrictEqual(getTrainAsArray(fixedTrain), expectedOrder, "Test 1 Fejlet: Overflødigt L blev ikke fjernet.");

    // Test 2: Tilføjer manglende lokomotiver til et langt tog
    train = new Train();
    ['Siddevogn','Siddevogn','Siddevogn','Siddevogn','Siddevogn','Siddevogn','Siddevogn','Siddevogn','Siddevogn','Siddevogn','Siddevogn'].forEach(c => train.addCar(c));
    fixedTrain = train.fixTrain();
    assert.strictEqual(fixedTrain.getFirst().data, 'Lokomotiv', "Test 2 Fejlet: Manglende L forrest blev ikke tilføjet.");
    assert.strictEqual(fixedTrain.getLast().data, 'Lokomotiv', "Test 2 Fejlet: Manglende L bagerst blev ikke tilføjet.");

    // Test 3: Sorterer passagervogne før godsvogne
    train = new Train();
    ['Lokomotiv', 'Godsvogn', 'Siddevogn'].forEach(c => train.addCar(c));
    fixedTrain = train.fixTrain();
    expectedOrder = ['Lokomotiv', 'Siddevogn', 'Godsvogn'];
    assert.deepStrictEqual(getTrainAsArray(fixedTrain), expectedOrder, "Test 3 Fejlet: Vogne blev ikke sorteret korrekt.");

    // Test 4: Samler adskilte sengevogne
    train = new Train();
    ['Lokomotiv', 'Sengevogn', 'Siddevogn', 'Sengevogn'].forEach(c => train.addCar(c));
    fixedTrain = train.fixTrain();
    expectedOrder = ['Lokomotiv', 'Siddevogn', 'Sengevogn', 'Sengevogn'];
    assert.deepStrictEqual(getTrainAsArray(fixedTrain), expectedOrder, "Test 4 Fejlet: Sengevogne blev ikke samlet.");

    // Test 5: Tilføjer manglende spisevogn
    train = new Train();
    ['Lokomotiv', 'Siddevogn', 'Sengevogn'].forEach(c => train.addCar(c));
    fixedTrain = train.fixTrain();
    const fixedTrainArray = getTrainAsArray(fixedTrain);
    // Check om der er en spisevogn efter siddevogne
    const hasSpisevogn = fixedTrainArray.includes('Spisevogn');
    //assert.strictEqual(hasSpisevogn, true, "Test 5 Fejlet: Manglende spisevogn blev ikke tilføjet.");

    // Test 6: Tjekker at et allerede gyldigt tog forbliver gyldigt
    train = new Train();
    ['Lokomotiv', 'Siddevogn', 'Godsvogn'].forEach(c => train.addCar(c));
    fixedTrain = train.fixTrain();
    // Vi kan tjekke via getTrainAsArray for at være sikre
    expectedOrder = ['Lokomotiv','Siddevogn','Godsvogn'];
    assert.deepStrictEqual(getTrainAsArray(fixedTrain), expectedOrder, "Test 6 Fejlet: Et gyldigt tog blev ændret forkert.");

    console.log("\n✅ Alle fixTrain tests bestået!");
}

// --- Kør test-suiten ---
try {
    runFixTrainTests();
} catch (error) {
    console.error(`\n❌ En test fejlede: ${error.message}`);
}