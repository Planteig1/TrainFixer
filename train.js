import {linkedList} from './linkedList.js'
export class Train {
    constructor() {
        this.cars = new linkedList();
    }

    addCar(type) {
        this.cars.add(type);
    }

    getCars() {
        return this.cars;
    }

    removeCar(index) {
        return this.cars.splice(index, 1)[0];
    }

    getLength() {
        return this.cars.size;
    }

    isValid() {
       
        //Tjek om der er Lokomotiv forrest og bagerst, hvis toget er over 10 vogne langt
        if (this.cars.size > 10) {
            if (this.cars.head.data !== "Lokomotiv" || this.cars.tail.data !== "Lokomotiv") {
                console.log("Tog skal både have Lokomotiv i fronten og bagenden!")
                return false
            }
        } else {
            //Tjek om første Node findes (Ikke er tom) og om det er af typen lokomotiv
            if (!this.cars.head || this.cars.head.data !== "Lokomotiv") {
                return false;
            }
        }

        //Loop igennem toget
        let currentWagon = this.cars.head;
        //GODSVOGNE TJEK
        let hasFoundGoodsWagon = false;

        //SENGEVOGNE TJEK
        let hasFoundFirstSleeper = false;
        let hasFoundLastSleeperInRow = false;



        while (currentWagon) {
            let currentWagonType = currentWagon.data;

            // GODSVOGNE TJEK
            //Tjek om vi har set Godsvogn
            if (currentWagonType == "Godsvogn") {
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




            currentWagon = currentWagon.next;
        }
        
        return true;

    }
}
