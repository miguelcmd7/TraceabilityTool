var fs = require('fs');
const mustache = require('mustache')


var data;
var beatles= {
    "beatles": [
        { "firstName": "John", "lastName": "Lennon" },
        { "firstName": "Paul", "lastName": "McCartney" },
        { "firstName": "George", "lastName": "Harrison" },
        { "firstName": "Ringo", "lastName": "Starr" }
    ],
    "name": function () {
        return this.firstName + " " + this.lastName;
    }
    }
data=  fs.readFileSync('./baseYaml/template.yaml', 'utf8')
console.log("pasando");
data=mustache.render(data,beatles);
fs.writeFileSync('./baseYaml/finish.yaml', data)



