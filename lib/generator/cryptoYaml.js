var fs = require('fs');
const mustache = require('mustache')

/**
 * 
 * @param {Base} base 
 */
function yamlGen(base){
    var data;
    data= fs.readFileSync('./lib/generator/baseYaml/crypto-config.yaml', 'utf8');

  data=mustache.render(data,base.cryptoJSON());
  //console.log(data);
  return data;
}
module.exports = yamlGen;