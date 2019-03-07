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
<<<<<<< HEAD
        return this.firstName + " " + this.lastName;
=======
        if (this.firstName == "John")
            return;
        return "* "+this.firstName + " " + this.lastName;
>>>>>>> tmp
    }
    }
data=  fs.readFileSync('./baseYaml/template.yaml', 'utf8')
console.log("pasando");
data=mustache.render(data,beatles);
<<<<<<< HEAD
fs.writeFileSync('./baseYaml/finish.yaml', data)
=======
fs.writeFileSync('./baseYaml/finish2.yaml', data)
>>>>>>> tmp



