/**
 * 
 * Shared Class to implement common operatons 
 * 
 */
class Shared{

    /**
     * Decode validation messages into json to pass to the view
     * 
     * @param {} errMsg 
     * @returns Jsonified mongoose validation errors
     */
    static JsonifyValididationError(errMsg){

        //error checks
        if(typeof(errMsg) == "undefined"){ return;}
        if(errMsg.length == 0){ return; }
        if(typeof(errMsg) == "objext"){JSON.stringify(errMsg)}


        //cut off the prefix validationerror
        errMsg = errMsg.substring(16,errMsg.length).split(",");

        let result = {};

        errMsg.forEach(msg => {
            let parts = msg.split(":")
            result[parts[0].trim()] = parts[1].trim();
        });

        return JSON.stringify(result);
    }


}

module.exports = Shared;