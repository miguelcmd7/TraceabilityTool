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
        if(fs.existsSync(_(['docker-compose.yaml'])))
             execSync('docker-compose -f ' + _(['docker-compose.yaml']) + ' down ')
    
    } catch (error) {
        console.log('Error stopping Network '+error)
    }
}

function createDirectories(){
    try{
        if(fs.existsSync(_(['crypto-config'])))
            fs.rmdirSync(_(['crypto-config']))
        else{
            //execSync('rm -r ' + _(['crypto-config']));
            fs.mkdirSync(_(['config']));
            fs.mkdirSync(_(['crypto-config']))
        }
    }catch(err){
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
    return new Promise(async (resolve,reject)=>{
        net.setIsBuilding(true)
        net.setState(false,'Stopping network and creating directories')
        stopNetwork()
        createDirectories()
        net.setState(false,'Generating crypto material')
        try{
             genCryptoYAML(net)
             cryptoGen(net).then(()=>{
                let networkYaml = gen(net)
                fs.writeFileSync(_(['docker-compose.yaml']), networkYaml);
                resolve();
                }) 
        }catch(err){
            
            net.setIsBuilding(false)
            console.log('Error building. Setting false'+ err)
            net.setState(true,'Error gerenating crypto material:\n' +err) 
        }
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