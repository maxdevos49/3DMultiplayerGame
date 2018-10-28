const Bcyrpt = require("bcrypt");

class Hash {

    /**
     * Method to hash a string like a passord when a new user is registered
     * 
     * @param {*} str
     */
    static hashString(str){

        let salt = Bcyrpt.genSaltSync(process.env.SALT || 5);
        return Bcyrpt.hashSync(str, salt);

    }

    /**
     * 
     * Method to compare a string to a hash to tell if they match
     * 
     * @param {*} str 
     * @param {*} hash 
     */
    static compareHash(str, hash){
        return Bcyrpt.compareSync(str, hash);

    }

}

//export the class
module.exports = Hash;