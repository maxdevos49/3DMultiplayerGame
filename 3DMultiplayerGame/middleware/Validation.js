const Shared = require("../helpers/Shared.js");

/**
 * Function to validate a user on a request
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * 
 * @returns a json object of a decoded token or auth rejection object if failed
 */
let validation = (req, res, next) => {

    let auth;
    if (req.cookies["WWW-Authenticate"]) {

        let token;
        token = req.cookies["WWW-Authenticate"];
        auth = Shared.tokenCheck(token);
        
    } else {
        auth = {"auth": false};
    }

    res.local = auth;
    next();
};

module.exports = validation;