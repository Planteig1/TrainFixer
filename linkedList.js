export class linkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    add(data) {
        const newNode = { data, next:null}

        // Tjekker om hovedet eksistere
        if (!this.head) {
            this.head = newNode
            this.tail = newNode
        }
        else {
            //Opdater Tail
            this.tail.next = newNode
            this.tail = newNode
        }
        this.size ++
    }

    swap() {

    }

    delete(node) {
        if(!this.head) {
            return;
        }
        // Slet head
        if (this.head == node) {
            this.head = this.head.next

            if(!this.head) {
                this.tail = null;
            }
            this.size--
            return true;
        }

        // Find på den vi vil slette, og den før.
        let currentNode = this.head;
        while (currentNode && currentNode.next !== node) {
            currentNode = currentNode.next;
        }

        if (currentNode.next) {
            currentNode.next = node.next;
        }

        if(this.tail === node) {
            this.tail = currentNode;
        }
        this.size--;


    }
}

/*
// ANTIG AT DIN LinkedList KLASSE ER DEFINERET OVENFOR HER
// ... (indsæt din LinkedList klasse her) ...

// --- TEST SETUP ---
const list = new linkedList();
console.log("Starter tests...\n");


// --- TESTS FOR 'add' ---
console.log("--- Tester 'add'-metoden ---");

// Test 1: Tilføj det første element til en tom liste
list.add('Vogn A');
if (list.size === 1 && list.head.data === 'Vogn A' && list.tail.data === 'Vogn A') {
    console.log("✅ Test 1 Bestået: Korrekt tilføjet til tom liste.");
} else {
    console.error("❌ Test 1 Fejlet: Problem med at tilføje til tom liste.");
    console.error("   - Fik size:", list.size, "head:", list.head.data, "tail:", list.tail.data);
}

// Test 2: Tilføj flere elementer
list.add('Vogn B');
list.add('Vogn C');
if (list.size === 3 && list.head.data === 'Vogn A' && list.tail.data === 'Vogn C') {
    console.log("✅ Test 2 Bestået: Korrekt tilføjet flere elementer.");
} else {
    console.error("❌ Test 2 Fejlet: Problem med at tilføje flere elementer.");
    console.error("   - Fik size:", list.size, "head:", list.head.data, "tail:", list.tail.data);
}
console.log(list); // Forventet output: Vogn A -> Vogn B -> Vogn C
console.log("\n");

const myList = new linkedList();
myList.add('A');
myList.add('B');
myList.add('C');

const tailNode = myList.tail; // Få en reference til noden med 'C'

console.log('Før sletning, tail er:', myList.tail.data); // Forventer 'C'
myList.delete(tailNode);
console.log('Efter sletning, ny tail er:', myList.tail.data); // Forventer 'B'

if (myList.tail.data === 'B') {
    console.log('✅ Test bestået!');
} else {
    console.log('❌ Test fejlet! Tail er ikke korrekt opdateret.');
}



console.log("\nTests fuldført!");

*/