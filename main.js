import {Train} from './train.js'

const myTrain = new Train()

const lokomotiv = "Lokomotiv"
const siddevogn = "Siddevogn"
const sengevogn = "Sengevogn"
const spisevogn = "Spisevogn"
const godsvogn = "Godsvogn"


myTrain.addCar(lokomotiv);
myTrain.addCar(siddevogn);
myTrain.addCar(sengevogn);
myTrain.addCar(spisevogn);
myTrain.addCar(godsvogn)
myTrain.addCar(godsvogn)
myTrain.addCar(godsvogn)
myTrain.addCar(godsvogn)
myTrain.addCar(godsvogn)
myTrain.addCar(godsvogn)
myTrain.addCar(godsvogn)
myTrain.addCar(lokomotiv);


console.log(myTrain)
console.log(myTrain.isValid())
