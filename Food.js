/*jshint esversion: 6 */
"use strict";

const schemaName = 'food';

module.exports = function (mongoose) {
    var schema = mongoose.Schema(
        {
            foodName: {type: String},

        },
        {
            toObject: {virtuals: true},
            toJSON: {virtuals: true},
            versionKey: false,
            timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
        }
    );

    return mongoose.model(schemaName, schema);
};
