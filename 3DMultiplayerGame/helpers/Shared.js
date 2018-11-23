const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 *
 * Shared Class to implement common operatons
 *
 */
class Shared {

    /**
     * Method to hash a string like a passord when a new user is registered
     *
     * @param {*} str
     */
    static hashString(str) {
        let salt = bcyrpt.genSaltSync(process.env.SALT || 5);
        return bcyrpt.hashSync(str, salt);
    }

    /**
     *
     * Method to compare a string to a hash to tell if they match
     *
     * @param {*} str
     * @param {*} hash
     */
    static compareHash(str, hash) {
        return bcyrpt.compareSync(str, hash);
    }

    /**
     * Method generates a token based on a given
     * @returns a token or false if signing fails
     *
     * @param {*} payload
     */
    static tokenGen(payload) {
        let result;
        try {
            result = jwt.sign(payload, process.env.secretKey || "SuperSecretKey");
        } catch (err) {
            result = false;
        }
        return result;
    }

    /**
     * Method checks the validity of a token
     * @returns decoded token otherwise false
     *
     * @param {*} token
     */
    static tokenCheck(token) {
        let result;

        try {
            result = jwt.verify(token, process.env.secretKey || "SuperSecretKey");
        } catch (err) {
            result = {
                auth: false
            };
        }
        return result;
    }

    /**
     * Method designed to escape html in a string
     * @param {*} text
     */
    static escapeHtml(text) {
        var map = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return text.replace(/[&<>"']/g, function (m) {
            return map[m];
        });
    }


    /**
     * Creates a model for a view to use to display data
     * @param {*} req 
     * @param {*} res 
     * @param {*} model 
     * @param {*} data
     * @returns a object containing all the information the view needs to function
     */
    static getModel(givenResponse, givenModel = {}, givenData = {}, givenValidation = {}) {

        //create result object
        let result = {
            authentication: {},
            model: {},
            data: {},
            validation: {}
        };
        
        result.model = givenModel.schema.tree;

        //add path
        for (let key in result.model) {
            result.model[key].path = key;
        }

        result.authentication = givenResponse.user;
        result.data = givenData;
        result.validation = givenValidation;

        // console.log(result)

        return result;
    }
}
module.exports = Shared;
