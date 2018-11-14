const vash = require("vash");

module.exports = function () {
  /**
   * LabelFor()
   * @returns html markup representing a label
   */
  vash.helpers.LabelFor = function (model, attributes = {}) {
    this.buffer.push(
      '<label for="' +
      model.key +
      '" ' +
      Object.keys(attributes)
        .map(function (attribute) {
          return attribute + '="' + attributes[attribute] + '"';
        })
        .join(" ") +
      ">" +
      model.name +
      "</label>"
    );
  };

  /**
   * TextBoxFor()
   * @returns html markup representing a text box
   */

  vash.helpers.TextBoxFor = function (prop, attributes = {}) {
    this.buffer.push(
      '<input type="text" id="' +
      prop.key +
      '" ' +
      'name="' +
      prop.key +
      '" ' +
      Object.keys(attributes)
        .map(function (attribute) {
          return attribute + '="' + attributes[attribute] + '"';
        })
        .join(" ") +
      ">"
    );
  };

  /**
   * PasswordBoxFor()
   * @returns html markup representing a text box
   */

  vash.helpers.PasswordBoxFor = function (prop, attributes = {}) {
    this.buffer.push(
      '<input type="password" id="' +
      prop.key +
      '" ' +
      'name="' +
      prop.key +
      '" ' +
      Object.keys(attributes)
        .map(function (attribute) {
          return attribute + '="' + attributes[attribute] + '"';
        })
        .join(" ") +
      ">"
    );
  };

  /**
   * ValdidationMessageFor()
   * @returns html markup representing validation needed for a specific model property
   */
  vash.helpers.ValidationMessageFor = function (prop,messages="", attributes = {}) {
    this.buffer.push(
      '<div class="text-danger">' +
      '<span for="' +
      prop.key +
      '" ' +
      Object.keys(attributes)
        .map(function (attribute) {
          return attribute + '="' + attributes[attribute] + '"';
        })
        .join(" ") +
      ">"+ messages +"</span>" +
      "</div>"
    );
  };
};
