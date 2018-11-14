const Shared = require("../helpers/Shared.js");
/**
 * Parse any validation errors that are in the url bar a a query
 */
module.exports = (req, res, next) => {

    res.local.valErr = Shared.JsonifyValididationError(req.query.validationError);
    console.log(res.local.valErr);
    next();

}