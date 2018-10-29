const jwt = require("jsonwebtoken");

/**
 * Token class
 * 
 * Generates tokens in the desired manner for the project
 */
class Token{

    /**
     * Method generates a token based on a given 
     *  @returns a token or false if signing fails
     * 
     * @param {*} payload 
     */
    static tokenGen(payload) {
        
        let result;
        try {
           result = jwt.sign(payload, process.env.secretKey || "SuperSecretKey");

       }catch(err){
        result = false;
       }
        return result;
    }

    /**
     * Method checks the validity of a token
     *  @returns decoded token otherwise false
     * 
     * @param {*} token 
     */
    static tokenCheck(token) {
        let result;

        try{
            result = jwt.verify(token, process.env.secretKey || "SuperSecretKey");

        }catch(err){

            result = {
                "auth": false
            };
        }
        return result;
    }

}

module.exports = Token;