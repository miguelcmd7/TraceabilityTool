const ModelChaincode = require('../../src/chaincode/modelChaincodeTemp.js');
const Errors = require('../utils/errorManager');

exports.createChaincodeTemp= function(req, res){
    try {
        res.status(200).send(ModelChaincode.createChaincodeTemp(req.body.ChannelName,req.body.AssetName,
            req.body.AssetAtrib,req.body.Functions))
    }catch(err){
        Errors.errorManager(res,err);
    }

}