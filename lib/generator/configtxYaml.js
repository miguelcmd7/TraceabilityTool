var fs = require('fs');
const mustache = require('mustache')

/**
 * 
 * @param {Base} base 
 */
function yamlGen(base){
    var data;
    data= fs.readFileSync('./lib/generator/baseYaml/configtx.yaml', 'utf8');

  data=mustache.render(data,base.toJSON());
  //console.log(data);
  return data;
}
module.exports = yamlGen;