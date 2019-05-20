const ErrorWithCode = require('../../lib/error/error')


class Function {
    /**
     * 
     * @param {string} name 
     * @param {boolean} atributes 
     */
    constructor(name, args) {
 

       if (name== null || name== ''){
           throw ErrorWithCode(400,'Asset name is required');
       }
        
        /**
         * @type {string} 
         */
        this.name = name
        

        this.args = args;
        
        
        return this;
    }
    

    toJSON(){
   
        return {
            funcName:this.name,
            args:this.args
        }
    }

}
module.exports = Function;