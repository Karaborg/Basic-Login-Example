'use strict';

var bluebird = require('bluebird');
var mongoose = require('mongoose');

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

var connectFunction = function () {

    var string = "mongodb+srv://test:test@cluster0-idaqf.mongodb.net/test?retryWrites=true&w=majority";

    // Using `mongoose.connect`...
    var promise = mongoose.connect(string, {
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

        console.log("DB connected");
    });

};

connectFunction();

exports.User            = require('./Model/user')(mongoose);
