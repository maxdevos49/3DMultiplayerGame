const vash = require("vash");

/**
 * Module containing useful vash helpers for faster page building
 */
module.exports = function () {

    /**
     * LabelFor()
     * @returns html markup representing a label
     */
    vash.helpers.LabelFor = function (model, attributes = {}) {
        property = model(this.model.model);

        this.buffer.push(`
            <label 
              for="${property.path}" 
              ${processAttributes(attributes)}>
                ${property.display}
            </label>
        `);
    };

    /**
     * TextBoxFor()
     * @returns html markup representing a text box
     */
    vash.helpers.TextBoxFor = function (model, value = '', attributes = {}) {
        property = model(this.model.model);
        value = model(this.model.data);

        Object.assign(attributes, processValidation(property));

        this.buffer.push(`
            <input 
              type="text" 
              id="${property.path}" 
              name="${property.path}"
              value="${value || ''}"
              ${processAttributes(attributes)} />
        `);
    };

    /**
     * PasswordBoxFor()
     * @returns html markup representing a text box
     */
    vash.helpers.PasswordBoxFor = function (model, value = '', attributes = {}) {
        property = model(this.model.model);

        Object.assign(attributes, processValidation(property));

        this.buffer.push(`
            <input 
              type="password" 
              id="${property.path}" 
              name="${property.path}" 
              value="${value || ''}"
              ${processAttributes(attributes)} />
        `);
    };

    /**
     * ValdidationMessageFor()
     * @returns html markup representing validation needed for a specific model property
     */
    vash.helpers.ValidationMessageFor = function (model, error = "", attributes = {}) {
        property = model(this.model.model);

        this.buffer.push(`
            <div 
              class="text-danger field-validation-valid" 
              data-valmsg-for="${property.path}"
              data-valmsg-replace="true"
              ${processAttributes(attributes)}>
              <span>${error}</span>
            </div>
        `);
    };

    /**
     * DisplayFor()
     * @returns the value of a model property
     */
    vash.helpers.DisplayFor = function (model, options = null) {
        property = model(this.model.data);
        propertyModel = model(this.model.model);

        if(options){
            if(options.type === "Date") {
                let date = new Date(Date.parse(property));
                property = `${date.toLocaleString()}`;
            }
        }
        
        if(property === 0){
            property = property.toString();
        }

        this.buffer.push(property || '');
    };

    /**
     * DisplayNameFor()
     * @returns the name of a model property
     */
    vash.helpers.DisplayNameFor = function (model) {
        property = model(this.model.model);
        this.buffer.push(property.display || property.path);
    };


    /**
     * Helper function that turns the attribute object into a html attribute string for insertsion into an html tag
     * @param {*} attributes 
     * @returns a string of html attributes
     */
    function processAttributes(attributes) {
        return (Object.keys(attributes).map(function (attribute) {
            return `${attribute}="${attributes[attribute]}"`;
        }).join(" "));
    }

    /**
     * Helper function that checks model for any validations and then creates an attribute object 
     * @param {*} property
     * @returns an object representing attributes needed for jquery unobtrusive validation
     */
    function processValidation(property) {

        let result = { "data-val": "true" };

        /**
         * Required
         */
        if (typeof (property.required) !== "undefined") {
            //check model format
            if (Array.isArray(property.required)) {
                //use custom message
                Object.assign(result, { "data-val-required": property.required[1] });
            } else {
                //use generic message
                Object.assign(result, { "data-val-required": `${property.display || property.path} is required!` });
            }
        }

        /**
         * Minimum Length
         */
        if (typeof (property.minlength) !== "undefined") {
            //check model format
            if (Array.isArray(property.minlength)) {
                //use custom message
                Object.assign(result, {
                    "data-val-minlength-min": property.minlength[0],
                    "data-val-minlength": property.minlength[1]
                });
            } else {
                //use generic message
                Object.assign(result, {
                    "data-val-minlength-min": property.minlength,
                    "data-val-minlength": `${property.display || property.path} must be atleast ${property.minlength} characters long!`
                });
            }
        }

        /**
         * Maximum Length
         */
        if (typeof (property.maxlength) !== "undefined") {
            //check model format
            if (Array.isArray(property.maxlength)) {
                //use custom message
                Object.assign(result, {
                    "data-val-maxlength-max": property.maxlength[0],
                    "data-val-maxlength": property.maxlength[1]
                });
            } else {
                //use generic message
                Object.assign(result, {
                    "data-val-maxlength-max": property.maxlength,
                    "data-val-maxlength": `${property.display || property.path} cannot exceed ${property.maxlength} characters long!`
                });
            }
        }

        /**
         * Equal To
         */
        if (typeof (property.matches) !== "undefined") {
            //check model format
            if (Array.isArray(property.matches)) {
                //use custom message
                Object.assign(result, {
                    "data-val-equalto-other": property.matches[0],
                    "data-val-equalto": property.matches[1]
                });
            } else {
                //use generic message
                Object.assign(result, {
                    "data-val-equalto-other": property.matches,
                    "data-val-equalto": `${property.display || property.path} must match ${property.matches}!`
                });
            }
        }

        /**
         * Credit Card
         *  data-val-creditcard="Error message"
         */


        /**
         * Email
         *  data-val-email="Error message"
         */


        /**
         * Range
         *  data-val-range="Error message"
         *  data-val-range-max="Max value"
         *  data-val-range-min="Min value"
         */


        /**
         * Regular Expression
         *  data-val-regex="Error message"
         *  data-val-regex-pattern="The regular expression (e.g. ^[a-z]+$)"
         */


        /**
         * String Length
         *  data-val-length="Error message"
         *  data-val-length-max="Maximum number of characters"
         */

        /**
         * Number
         * data-val-number=”ErrMsg”
         */

        /**
         * URL
         * data-val-url=”ErrMsg”
         */

        /**
         * Helpful Regex
         * 
         * Number	
         *   ^(\d{1,3},?(\d{3},?)*\d{3}(\.\d{1,3})?|\d{1,3}(\.\d{2})?)$
         * 
         * Date
         *   ^[0,1]?\d{1}\/(([0-2]?\d{1})|([3][0,1]{1}))\/(([1]{1}[9]{1}[9]{1}\d{1})|([2-9]{1}\d{3}))$
         * 
         * URL	
         *   ^(http|https)\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*$
         * 
         * Phone
         *   ^([\+][0-9]{1,3}([ \.\-])?)?([\(]{1}[0-9]{3}[\)])?([0-9A-Z \.\-]{1,32})((x|ext|extension)?[0-9]{1,4}?)$
         * 
         */

        return result;
    }

}
