import {linkedList} from './linkedList.js'
export class Train {
    constructor() {
        this.cars = new linkedList();
    }

    addCar(type) {
        this.cars.add(type);
    }

    getLength() {
        return this.cars.size;
    }

    isValid() {
        //Tjekker tomt tog
        if (!this.cars.head) {
            console.log("Toget eksistere ikke");
            return false;
        }

        //Tjekker om tog > 10 har Lokomotiv i forrest og bagerst
        if (this.cars.size > 10) {
            if(this.cars.head.data !== "Lokomotiv" || this.cars.tail.data !== "Lokomotiv") {
                console.log("Tog over 10 vogne skal have et Lokomotiv forrest og bagerst");
                return false;
            }
        } else {
            if (this.cars.head.data !== "Lokomotiv") {
                console.log("Den første vogn skal være et Lokomotiv");
                return false;
            }

            //Tjek for ekstra Lokomotiver i et kort tog (<10)
            let currentWagon = this.cars.head.next
            while(currentWagon) {
                if (currentWagon.data == "Lokomotiv") {
                    console.log("Korte tog må kun have et Lokomotiv")
                    return false;
                }
                currentWagon = currentWagon.next
            }
        }
        //Loop igennem toget
        let currentWagon = this.cars.head;
        //GODSVOGNE TJEK
        let hasFoundGoodsWagon = false;

        //SENGEVOGNE TJEK
        let hasFoundFirstSleeper = false;
        let hasFoundLastSleeperInRow = false;

        //SPISEVOGN TJEK
        let bedBlocker = false;

        while (currentWagon) {
            let currentWagonType = currentWagon.data;

            // GODSVOGNE TJEK
            //Tjek om vi har set Godsvogn
            if (currentWagonType == "Godsvogn" && !hasFoundGoodsWagon) {
                hasFoundGoodsWagon = true;
            }
            //Tjek at der ikke er passagervogne bag godsvogne
            if (hasFoundGoodsWagon && (currentWagonType == "Siddevogn" || currentWagonType == "Sengevogn" || currentWagonType == "Spisevogn")) {
                console.log("Alle godsvogne skal være bag passagervogne")
                return false;
            }

            // SENGEVOGN TJEK
            if (currentWagonType == "Sengevogn" && !hasFoundFirstSleeper) {
                hasFoundFirstSleeper = true;
            }
            
            if (currentWagonType !== "Sengevogn" && hasFoundFirstSleeper) {
                hasFoundLastSleeperInRow = true;
            }
            // En sengevogn bliver fundet efter blokken er slut
            if (currentWagonType == "Sengevogn" && hasFoundLastSleeperInRow) {
                console.log("Alle sengevogne skal ligge i forlængelse af hinanden");
                return false;
            }

            // SPISEVOGN TJEK
            if (currentWagonType == "Sengevogn") {
                bedBlocker = true;
            }
            if (currentWagonType == "Spisevogn" || currentWagonType == "Siddevogn") {
                bedBlocker = false;
            }

            if (currentWagonType == "Siddevogn" && bedBlocker) {
                console.log("Siddevogn kan ikke nå spisevogn, uden at krydse en sengevogn")
                return false;
            }
            currentWagon = currentWagon.next
        }
        return true;
    }

    fixTrain() {
        //Gem alle vogne
        let lokomotiver = []
        let godsvogne = []
        let spisevogne = []
        let siddevogne = []
        let sengevogne = []

        //Loop igennem toget
        let currentWagon = this.cars.head

        while(currentWagon) {
            let currentWagonType = currentWagon.data
            if (currentWagonType == "Lokomotiv") lokomotiver.push(currentWagon.data) 
                else if (currentWagonType == "Godsvogn") godsvogne.push(currentWagon.data)
                    else if (currentWagonType == "Spisevogn") spisevogne.push(currentWagon.data)
                        else if (currentWagonType == "Siddevogn") siddevogne.push(currentWagon.data)
                            else if (currentWagonType == "Sengevogn") sengevogne.push(currentWagon.data)

            currentWagon = currentWagon.next
        }

        const totalWagons = this.cars.size;

    // Trin 2: Anvend reglerne på de sorterede lister

    const finalTrain = []

    //Tilføj et lokomotiv i starten
    if (lokomotiver) {
        finalTrain.push(lokomotiver[0])
    }
    //Tilføj siddevogn
    siddevogne.forEach((siddevogn)=> {
        finalTrain.push(siddevogn)
    })

    //Tilføj spisevogne efter siddevogne, så alle har adgang
    spisevogne.forEach((spisevogn) => {
        finalTrain.push(spisevogn)
    })

    //Tilføj sengevogne ( Automatisk i forlængelse af hinanden)
    sengevogne.forEach((sengevogn) => {
        finalTrain.push(sengevogn)
    })

    //Tilføj godsvogne
    godsvogne.forEach((godsvogn) => {
        finalTrain.push(godsvogn)
    })

    //Tjek om der er behov for et ekstra lokomotiv
    if (totalWagons > 10) {
        //Tjek om der findes et ekstra lokomotiv
        if (lokomotiver[1]) {
            finalTrain.push(lokomotiver[1])
        } else {
            finalTrain.push("Lokomotiv")
        }
    }

    let fixedTrain = new linkedList
    finalTrain.forEach((vogn) => {
        fixedTrain.add(vogn)
    })    

    return fixedTrain;

    }
}
