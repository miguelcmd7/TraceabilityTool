class ErrorWithCod extends Error{
    constructor(cod, message){
        super(message)
        this.error_message = message;
        this.cod = cod;
    }

}
module.exports = ErrorWithCod;