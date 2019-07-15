var fs = require('fs');
const path = require('path')
const mustache = require('mustache')

/**
 * 
 * @param {Base} base 
 */
function yamlGen(base){
    var data;
    data= fs.readFileSync(path.join(__dirname,'baseYaml','docker-compose.yaml'), 'utf8');

  data=mustache.render(data,base.toJSON());
  //console.log(data);
  return data;
}
function crytoGen(org){
  var data;
  data= fs.readFileSync(path.join(__dirname,'baseYaml','crypto-config.yaml'), 'utf8');
  data=mustache.render(data,org.toJSON());
  return data;
}
module.exports = yamlGen;