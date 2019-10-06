var express = require('express')
var app = express();

var middleware = function(req, res){
    res.status(200).send()  //Envía una respuesta con código HTML 200
}

app.get('/route', middleware) //Todas las peticioens a /route serán atendiadas por el middleware

app.listen(3000)