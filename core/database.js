'use strict';

var bluebird = require('bluebird');
var mongoose = require('mongoose');

require('dotenv').config();

// Cache 50 queries for 30 minutes
var cacheOptions = null;
if (process.env.DEBUG) {
    cacheOptions = {
        max: 50,
        maxAge: 1000 * 60 * 30,
        debug: true
    };
} else {
    cacheOptions = {
        max: 50,
        maxAge: 1000 * 60 * 30
    };
}

mongoose.Promise = bluebird;

require('mongoose-cache').install(mongoose, cacheOptions);

var mongodb_connection_string = `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@mongodb:27017/users?authSource=admin`

var connectFunction = function () {

    // Using `mongoose.connect`...
    var promise = mongoose.connect(mongodb_connection_string, {
        /* other options */
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    promise.then(function(db) {

        var db2 = mongoose.connection;

        db2.on('error', function (err) {
            console.log(err);
        });

        db2.on('disconnected', function () {
            setTimeout(connectFunction, 5000);
        });

        db2.on('timeout', function () {
            setTimeout(connectFunction, 5000);
        });

        db2.once('open', function () {
            console.log('Connected to database.');
        });

        console.log('DB connected');
    });

};

connectFunction();

exports.user            = require('./Model/user')(mongoose);