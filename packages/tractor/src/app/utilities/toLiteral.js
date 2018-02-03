'use strict';

var _ = require('lodash');

module.exports = (function () {
    return function (value) {
        var boolean = toBoolean(value);
        var number = toNumber(value);
        var nil = toNull(value);
        if (boolean != null) {
            return boolean;
        } else if (number != null) {
            return number;
        } else if (nil === null) {
            return nil;
        }
    };

    function toBoolean (value) {
        if (value === 'true') {
            return true;
        } else if (value === 'false') {
            return false;
        }
    }

    function toNumber (value) {
        var number = +value;
        if (value && _.isNumber(number) && !_.isNaN(number)) {
            return number;
        }
    }

    function toNull (value) {
        if (value === 'null') {
            return null;
        }
    }
})();
