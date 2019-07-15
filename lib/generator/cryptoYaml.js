var fs = require('fs');
const path = require('path')
const mustache = require('mustache')

/**
 * 
 * @param {Base} base 
 */
function yamlGen(base){
    var data;
    data= fs.readFileSync(path.join(__dirname,'baseYaml','crypto-config.yaml'), 'utf8');

  data=mustache.render(data,base.cryptoJSON());
  //console.log(data);
  return data;
}
module.exports = yamlGen;