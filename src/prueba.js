const Peer = require ('./peer')

const PeerConf = require('./peerConf')
var prueba = new Map();

// var peer1=new Peer('peer1','meta.com',4583,5698);


// prueba.set("Hola", peer1);


//     /** 
//    *@param {Peer} value 
//    **/

// console.log(prueba.entries())
// for (var [key,value] of prueba.entries()){
//     console.log(value.getId());

// }

// var hola = {}
// hola.nuevo={}
// hola.nuevo.nuevo2 = 6
//hola['nuevo']['nuevo']=6
var peerConf  = new PeerConf({anchor:true});
console.log(peerConf.anchor)
// console.log(prueba);
// var mapIter = prueba.entries();

// var element=[]
// function each(value, key, map){
//     element.push(key)
// }
// prueba.forEach(each)

// prueba.forEach(each)
// console.log(element)