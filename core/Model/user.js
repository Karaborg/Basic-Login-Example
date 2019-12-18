/*jshint esversion: 6 */
"use strict";

const schemaName = 'user';

module.exports = function (mongoose) {
    var schema = mongoose.Schema(
        {
            username: {type: String},
            password: {type: String}
        }
    );

    return mongoose.model(schemaName, schema);
};