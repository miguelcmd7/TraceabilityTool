var fs = require('fs');
const mustache = require('mustache')

/**
 * 
 * @param {Peer} peer 
 */
function cryptoYamlGen(peer){

  var data=  fs.readFileSync('./lib/generator/baseYaml/crypto-config.yaml', 'utf8');
  console.log(data);
  data=mustache.render(data,peer.toJSON());
  console.log(data);
  return data;
}
module.exports = cryptoYamlGen;