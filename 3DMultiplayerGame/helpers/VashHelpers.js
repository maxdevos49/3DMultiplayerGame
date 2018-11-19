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

        this.buffer.push(`
            <label 
              for="${model.key}" 
              ${processAttributes(attributes)}>
                ${model.display}
            </label>
        `);
    };

    /**
     * TextBoxFor()
     * @returns html markup representing a text box
     */

    vash.helpers.TextBoxFor = function (prop, attributes = {}) {
        
        Object.assign(attributes, processValidation(prop));
        
        this.buffer.push(`
            <input 
              type="text" 
              id="${prop.key}" 
              name="${prop.key}"
              ${processAttributes(attributes)} />
        `);
    };

    /**
     * PasswordBoxFor()
     * @returns html markup representing a text box
     */

    vash.helpers.PasswordBoxFor = function (prop, attributes = {}) {

        Object.assign(attributes, processValidation(prop));

        this.buffer.push(`
            <input 
              type="password" 
              id="${prop.key}" 
              name="${prop.key}" 
              ${processAttributes(attributes)} />
        `);
    };

    /**
     * ValdidationMessageFor()
     * @returns html markup representing validation needed for a specific model property
     */
    vash.helpers.ValidationMessageFor = function (prop, attributes = {}) {
        this.buffer.push(`
            <div 
              class="text-danger field-validation-valid" 
              data-valmsg-for="${prop.key}"
              data-valmsg-replace="true"
              ${processAttributes(attributes)}>
            </div>
        `);
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
     * Checks model for any validations and then creates an attribute object 
     * @param {*} property
     * @returns an object representing attributes needed for jquery unobtrusive validation
     */
    function processValidation(property){

        let result = {"data-val":"true"};

        /**
         * Required
         */
        if(typeof(property.required) !== "undefined"){
            //check model format
            if(Array.isArray(property.required)){
                //use custom message
                Object.assign(result, {"data-val-required": property.required[1]});
           }else{
               //use generic message
               Object.assign(result, {"data-val-required": `${property.display || property.key} is required!`});
           }
        }

        /**
         * Minimum Length
         */
        if(typeof(property.minlength) !== "undefined"){
            //check model format
            if(Array.isArray(property.minlength)){
                //use custom message
                Object.assign(result, {
                    "data-val-minlength-min": property.minlength[0],
                    "data-val-minlength": property.minlength[1]
                });
           }else{
               //use generic message
               Object.assign(result, {
                    "data-val-minlength-min": property.minlength,
                    "data-val-minlength":`${property.display || property.key} must be atleast ${property.minlength} characters long!`
                });
           }
        }

        /**
         * Maximum Length
         */
        if(typeof(property.maxlength) !== "undefined"){
            //check model format
            if(Array.isArray(property.maxlength)){
                //use custom message
                Object.assign(result, {
                    "data-val-maxlength-max": property.maxlength[0],
                    "data-val-maxlength": property.maxlength[1]
                });
           }else{
               //use generic message
               Object.assign(result, {
                    "data-val-maxlength-max": property.maxlength,
                    "data-val-maxlength":`${property.display || property.key} cannot exceed ${property.maxlength} characters long!`
                });
           }
        }

        //Compare
        //    data-val-equalto="Error message"
        //    data-val-equalto-other="The name of the other field"
        if(typeof(property.matches) !== "undefined"){
            //check model format
            if(Array.isArray(property.matches)){
                //use custom message
                Object.assign(result, {
                    "data-val-equalto-other": property.matches[0],
                    "data-val-equalto": property.matches[1]
                });
           }else{
               //use generic message
               Object.assign(result, {
                    "data-val-equalto-other": property.matches,
                    "data-val-equalto":`${property.display || property.key} must match ${property.matches}!`
                });
           }
        }


        /*
            //TODO
            these below all need added and possibly more too

            CreditCard
            data-val-creditcard="Error message"

            EmailAddress
            data-val-email="Error message"

            Range
            data-val-range="Error message"
            data-val-range-max="Max value"
            data-val-range-min="Min value"

            RegularExpression
            data-val-regex="Error message"
            data-val-regex-pattern="The regular expression (e.g. ^[a-z]+$)"

            StringLength
            data-val-length="Error message"
            data-val-length-max="Maximum number of characters"
         */
        
        

        return result;

    }

}
