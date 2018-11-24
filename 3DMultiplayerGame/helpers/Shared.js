const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Shared Class to implement common operatons
 *
 * @author Maxwell DeVos
 * 
 */
class Shared {

    /**
     * Method to hash a string like a passord when a new user is registered
     *
     * @param {string} str
     * 
     * @returns {string}a string representing a hash
     */
    static hashString(str) {
        let salt = bcyrpt.genSaltSync(process.env.SALT || 5);
        return bcyrpt.hashSync(str, salt);
    }

    /**
     * Method to compare a string to a hash to tell if they match
     *
     * @param {string} str
     * @param {string} hash
     * 
     * @returns {boolean} true or false
     */
    static compareHash(str, hash) {
        return bcyrpt.compareSync(str, hash);
    }

    /**
     * Method generates a token based on a given
     * 
     * @param {string} payload
     * 
     * @returns {string} a token or false if signing fails
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
     *
     * @param {string} token
     * 
     * @returns {Object} decoded token otherwise false
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
     * 
     * @param {string} text
     * 
     * @returns {string} an escaped string
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
     * 
     * @param {Object} givenResponse 
     * @param {Object} givenModel
     * @param {Object} givenData
     * 
     * @returns {Object} an object containing all the information the view needs to function
     */
    static getModel(givenResponse, givenModel = null, givenData = null) {

        //init result object
        let result = {
            authentication: {},
            model: {},
            data: {},
            validation: {}
        };

        //model processing
        if (givenModel) {
            result.model = givenModel.schema.tree;
            //add path
            for (let key in givenModel.schema.tree) {
                result.model[key].path = key;
            }
        }

        //validation processing
        if (givenResponse.user.error) {
            //add validation
            for (let key in givenResponse.user.error) {
                result.validation[key] = givenResponse.user.error[key].properties.message;
            }
        }

        //add authentication
        result.authentication = givenResponse.user;
        
        //add data
        result.data = givenData || givenResponse.req.body;

        return result;
    }
}
module.exports = Shared;
