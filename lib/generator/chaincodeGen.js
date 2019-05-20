var fs = require('fs');
const mustache = require('mustache')

/**
 * 
 * @param {Base} base 
 */
function chaincodeGen(chaincode){
    var data;
    data= fs.readFileSync('../../lib/generator/baseYaml/chaincode.go', 'utf8');

  data=mustache.render(data,chaincode.toJSON());
  //console.log(data);
  return data;
}

module.exports = chaincodeGen;