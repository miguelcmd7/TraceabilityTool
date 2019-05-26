// const Peer = require ('./peer')

// const PeerConf = require('./peerConf')
// var prueba = new Map();

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
let mapa = new Map ()
let AllIdsMaps = new Map()
let peers = ['peer1','peer2','peer3'];
mapa.set('org1',['peer1','peer2','peer3']);
mapa.forEach((values,key)=>{
     key = key+'.domain.con'
    let peersAllId =[]
    values.forEach((value)=>{
        peersAllId.push(value+'.'+key);
    })
    AllIdsMaps.set(key,peersAllId);
    
})


peers =peers.map((value)=>{
    return value+ '.domain.es'
})

console.log(peers);
//console.log(AllIdsMaps);
// console.log(prueba);
// var mapIter = prueba.entries();

// var element=[]
// function each(value, key, map){
//     element.push(key)
// }
// prueba.forEach(each)

// prueba.forEach(each)
// console.log(element)