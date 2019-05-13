const ErrorWithCode = require('../../lib/error/error')

exports.errorManager = function(res, err){
    console.log(err)
    if (err instanceof ErrorWithCode )     
        res.status(err.cod).send({error_message : err.error_message});
    else 
        res.status(500).send(err);
}