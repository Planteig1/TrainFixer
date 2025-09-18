import { Train } from './train.js';

// Hjælpefunktion til hurtigt at bygge tog
function buildTrainWithCars(cars) {
    const train = new Train();
    cars.forEach(car => train.addCar(car));
    return train;
}

describe('Train.isValid()', () => {
    // ----------------------
    // Lokomotiv regler
    // ----------------------
    test('Returnerer false hvis toget er tomt', () => {
        const train = new Train();
        expect(train.isValid()).toBe(false);
    });

    test('Kort tog (<10): Skal starte med Lokomotiv', () => {
        const train = buildTrainWithCars(['Siddevogn','Sengevogn']);
        expect(train.isValid()).toBe(false);
    });

    test('Kort tog (<10): Må kun have et Lokomotiv forrest', () => {
        const train = buildTrainWithCars(['Lokomotiv','Siddevogn','Lokomotiv']);
        expect(train.isValid()).toBe(false);
    });

    test('Langt tog (>10): Skal have Lokomotiv forrest og bagest', () => {
        const cars = ['Lokomotiv', ...Array(9).fill('Siddevogn'), 'Siddevogn'];
        const train = buildTrainWithCars(cars);
        expect(train.isValid()).toBe(false);
    });

    test('Langt tog (>10): Gyldigt med Lokomotiv forrest og bagest', () => {
        const cars = ['Lokomotiv', ...Array(9).fill('Siddevogn'), 'Lokomotiv'];
        const train = buildTrainWithCars(cars);
        expect(train.isValid()).toBe(true);
    });

    // ----------------------
    // Godsvogn regler
    // ----------------------
    test('Godsvogne må ikke ligge foran passagervogne', () => {
        const train = buildTrainWithCars(['Lokomotiv', 'Godsvogn', 'Siddevogn']);
        expect(train.isValid()).toBe(false);
    });

    test('Gyldigt tog med godsvogne bagerst', () => {
        const train = buildTrainWithCars(['Lokomotiv','Siddevogn','Godsvogn']);
        expect(train.isValid()).toBe(true);
    });

    // ----------------------
    // Sengevogne regler
    // ----------------------
    test('Sengevogne skal ligge samlet', () => {
        const train = buildTrainWithCars(['Lokomotiv','Sengevogn','Siddevogn','Sengevogn']);
        expect(train.isValid()).toBe(false);
    });

    test('Gyldigt tog med sammenhængende sengevogne', () => {
        const train = buildTrainWithCars(['Lokomotiv','Sengevogn','Sengevogn','Siddevogn']);
        expect(train.isValid()).toBe(true);
    });

    // ----------------------
    // Spisevogn regler
    // ----------------------
    test('Siddevogn kan nå Spisevogn uden at krydse Sengevogn', () => {
        const train = buildTrainWithCars(['Lokomotiv','Siddevogn','Spisevogn','Sengevogn']);
        expect(train.isValid()).toBe(true);
    });

    test('Siddevogn kan ikke nå Spisevogn uden at krydse Sengevogn', () => {
        const train = buildTrainWithCars(['Lokomotiv','Sengevogn','Siddevogn','Spisevogn']);
        expect(train.isValid()).toBe(false);
    });

    test('Gyldigt tog med flere sidde- og spisevogne', () => {
        const train = buildTrainWithCars([
            'Lokomotiv','Siddevogn','Siddevogn','Spisevogn','Siddevogn'
        ]);
        expect(train.isValid()).toBe(true);
    });
});

function linkedListToArray(list) {
    const arr = [];
    let current = list.head;
    while(current) {
        arr.push(current.data);
        current = current.next;
    }
    return arr;
}

describe('Train.fixTrain()', () => {

    test('Simpelt tog: Skal ordne vogne korrekt', () => {
        const train = buildTrainWithCars(['Lokomotiv','Siddevogn','Sengevogn','Spisevogn','Godsvogn']);
        const fixed = train.fixTrain();
        const arr = linkedListToArray(fixed);

        expect(arr[0]).toBe('Lokomotiv');
        expect(arr.indexOf('Siddevogn')).toBeLessThan(arr.indexOf('Spisevogn'));
        expect(arr.indexOf('Sengevogn')).toBeGreaterThan(arr.indexOf('Spisevogn'));
        expect(arr[arr.length-1]).toBe('Godsvogn');
    });

    test('Flere sidde- og spisevogne: Siddevogne samlet før spisevogne', () => {
        const train = buildTrainWithCars([
            'Lokomotiv','Spisevogn','Siddevogn','Siddevogn','Spisevogn'
        ]);
        const fixed = train.fixTrain();
        const arr = linkedListToArray(fixed);

        const lastSiddeIndex = Math.max(...arr.map((v,i)=>v==='Siddevogn'?i:-1));
        const firstSpiseIndex = Math.min(...arr.map((v,i)=>v==='Spisevogn'?i:Infinity));
        expect(lastSiddeIndex).toBeLessThan(firstSpiseIndex);
    });

    test('Sengevogne skal ligge samlet', () => {
        const train = buildTrainWithCars(['Lokomotiv','Siddevogn','Sengevogn','Sengevogn','Spisevogn']);
        const fixed = train.fixTrain();
        const arr = linkedListToArray(fixed);

        const sleeperIndices = arr.map((v,i)=>v==='Sengevogn'?i:-1).filter(i=>i!==-1);
        for (let i=1;i<sleeperIndices.length;i++) {
            expect(sleeperIndices[i]).toBe(sleeperIndices[i-1]+1);
        }
    });

    test('Langt tog (>10 vogne) skal have ekstra lokomotiv bagerst', () => {
        const cars = ['Lokomotiv', ...Array(10).fill('Siddevogn'), 'Sengevogn', 'Godsvogn'];
        const train = buildTrainWithCars(cars);
        const fixed = train.fixTrain();
        const arr = linkedListToArray(fixed);

        expect(arr[0]).toBe('Lokomotiv');
        expect(arr[arr.length-1]).toBe('Lokomotiv'); // ekstra lokomotiv til bagerst
        expect(arr.includes('Godsvogn')).toBe(true);
    });

    test('Godsvogne placeres altid bagerst', () => {
        const train = buildTrainWithCars(['Lokomotiv','Godsvogn','Siddevogn','Spisevogn']);
        const fixed = train.fixTrain();
        const arr = linkedListToArray(fixed);

        expect(arr[arr.length-1]).toBe('Godsvogn');
    });

});