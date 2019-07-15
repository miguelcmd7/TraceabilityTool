const Function = require('./function')
const Asset = require('./asset')
const Chaincode = require('./chaincode')
const chaincodeGen = require('../../lib/generator/chaincodeGen');
const fs = require('fs');

let f1 = new Function("findCar",true)
let f2 = new Function("getAllColors",false)
let f3 = new Function("getAllCilindros",true)
let f4 = new Function("getAllCars",true)

console.log(f1.toJSON())

let atributes = [
    {name:"matricula",type:"int"},
    {name:"color",type:"string"},
    {name:"numPuertas",type:"int"},
    {name:"cilindrada",type:"int"},
    {name:"modelo",type:"int"},
    {name:"marca",type:"int"},
    {name:"ano",type:"int"}

]

let asset1 = new Asset("Car", atributes)

console.log(asset1.toJSON())

let chaincode = new Chaincode("Cars",asset1,[f1,f2,f3,f4])
console.log(chaincode.toJSON())
fs.writeFileSync('/home/miguel/go/src/chaincodeCreated/newchaincode.go',chaincodeGen(chaincode));
fs.writeFileSync('./newchaincode.go',chaincodeGen(chaincode));