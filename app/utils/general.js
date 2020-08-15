const config = require('../../config.json');

const General = function () {

    General.defaultDatabase = config.database.default;

    if (typeof General.mongoDB == 'undefined') {
        const mongodbCliente = require('mongodb').MongoClient;
        const url = config.database.mongodb.url;
        General.mongoDB = { client: mongodbCliente, url: url };
    }

    this.getMongoDB = function () {
        return General.mongoDB;
    };

    this.getDatabaseModel = function () {
        let model;
        switch (General.defaultDatabase) {
            case 'mongodb':
                model = require('../models/mongodb-model')(General.mongoDB.client, General.mongoDB.url);
                break;
            default:
                model = require('../models/mongodb-model')(General.mongoDB.client, General.mongoDB.url);
                break;
        }

        return model;

    };

    this.setDefaultDatabase = function (database) {
        General.defaultDatabase = database;
    };


    return this;
};
module.exports = General;