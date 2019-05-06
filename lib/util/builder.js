const _ = require('./util');
const  gen = require('../generator/yalmGenerator');
const fs = require('fs');
const Network = require('../../src/common/network')
const ChannelBuilder = require('./channelCreator');

const cryptoGen = require('../generator/cryptoGen')
const crypto = require('../generator/cryptoYaml');
const config = require('../generator/configtxYaml');


const { execSync, exec } = require('child_process');
function stopNetwork(){
    try {
        execSync('docker-compose -f ' + _(['docker-compose.yaml']) + ' down ')
    
    } catch (error) {
    
    }
}

function createDirectories(){
    try{
        execSync('rm -r ' + _(['crypto-config']));
        fs.mkdirSync(_(['config']));
        fs.mkdirSync(_(['crypto-config']))
    }catch{
        //throw "Error trying create direcotries"
    }
}


function genCryptoYAML(net){
    let configYaml = config(net);
    //console.log(configYaml)
    let cryptoYaml = crypto(net)
    fs.writeFileSync(_(['configtx.yaml']), configYaml);
    fs.writeFileSync(_(['crypto-config.yaml']), cryptoYaml);
}
/**
 * 
 * @param {Network} net 
 */
async function build(net){
return new Promise((resolve,reject)=>{
    stopNetwork()
    createDirectories()
    genCryptoYAML(net)
    cryptoGen(net).then(()=>{
        let networkYaml = gen(net)
        fs.writeFileSync(_(['docker-compose.yaml']), networkYaml);
        resolve();
         }) 
    })
}
async function launch(net){
    return new Promise((resolve,reject)=>{
        stopNetwork()
        let networkYaml = gen(net)
        fs.writeFileSync(_(['docker-compose.yaml']), networkYaml);
        //execSync('configtxgen -configPath '+ process.env.DEST_DIRECTORY+' -profile OneOrgOrdererGenesis -outputBlock ' + _(['config', 'genesis.block']))
        execSync('docker-compose -f ' + _(['docker-compose.yaml']) + ' up -d ');
        setTimeout(async ()=>{
            for (let channel of net.getChannels()){
               await  ChannelBuilder.initChannel(channel,net);
            }
            resolve()
        },1500)
    })
}
module.exports = { build, launch};