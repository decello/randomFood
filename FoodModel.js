/*jshint esversion: 6 */
'use strict';

var CLASS_TAG = "userModel";

var Food = require('../database.js').Food;

/**
 * Find account by email address
 *
 * @param email     Email address of registered account
 * @param callback  Callback function, has response json parameter
 */

exports.setInterests = function (userId, interests, callback) {

    var args = {
        interests : interests._id
    };

    Food.update({_id: userId}, {$set: args}, function (err) {
        if (err) {
            callback({success: false, error: err});
        } else {
            callback({success: true});
        }
    });
};


exports.findUsersByPackage = function(packageNum,callback){
    Food.find({package:packageNum}, function (err, result) {
        if(!err){
            callback({success:true, result:result});
        }else{
            callback({success:false, error:"User cannot be found"})
        }
    });
};

exports.findByUserId = function (userId, callback) {

    console.log(userId);
    var options = {populate:{path: 'axa health'},select:'-updatedAt -createdAt -status'};

    Food.find({_id:userId, status:'ACTIVE'},null, options, function (err, result) {
        if(!err){
            callback({success:true, result:result});
        }else{
            callback({success:false, error:"User cannot be found"});
        }
    });

};

exports.UpdateUsersByUserId = function (userId, callback) {
    Food.find({_id:userId}, function (err, result) {
        if(!err){
            callback({success:true,result:result});
        }else {
            callback({success:false, error:"User cannot be found"})
        }

    });
};

/**
 * Find account by idu7
 *
 * @param id        Id of account
 * @param populate  References to populate
 * @param callback  Callback function, has response json parameter
 */
exports.findById = function (id, populate, callback) {

    if (typeof populate === 'function') {
        callback = populate;
        populate = undefined;
    }else{
        populate = null
    }

    var options = null;
    if (populate) {
        options = {populate: populate};
    }

    Food.findOne({_id:id}, null, options, function (err, result) {
        if(err){
            callback({success:false})
        }else{
            callback({success:true, account:result});
        }
    });
};

exports.findByDeviceId = function (id, populate, callback) {

    if (typeof populate === 'function') {
        callback = populate;
        populate = undefined;
    }else{
        populate = null
    }

    var options = null;
    if (populate) {
        options = {populate: populate};
    }

    Food.findOne({deviceId:id}, null, options, function (err, result) {
        if(err){
            callback({success:false})
        }else{
            callback({success:true, account:result});
        }
    });
};



exports.findUsersByQuery = function (query, sort, exclude, callback) {

    Food.find(query)
        .select('-password -updatedAt -createdAt -status -account -device -TCNo -IBAN -iyzicoId -token -email -phone')
        .exec(function (err, result) {
            if (err) {
                callback({success: false, error: err});
            } else {
                callback({success: true, result: result});
            }
        });
};
/**
 * Creates new account.
 *
 * @param params    Json object for parameters needed to create new account
 * @param callback  Callback function, returns accountItem
 */
exports.create = function (params, callback) {

    var food = new Food(params);

    food.save(function (err, accountItem) {
        if (err) {
            callback({success: false, error:err});
        }else{
            callback({success: true, account: accountItem});
        }
    });

};

/**
 * Lists all sessions
 *
 * @param callback  Callback function, returns all accounts if successful
 */
exports.list = function (callback) {
    find({}, callback);
};

/**
 * Deletes account object with given id
 *
 * @param id        Id of account to delete
 * @param callback  Callback function
 */
exports.deleteById = function (id, callback) {
    Food.remove({_id: id}, function (err) {
        if (err) {
            callback({success: false, error: err});
        } else {
            callback({success: true});
        }
    });
};


exports.updateById = function (id, args, callback) {
    console.log("----");
    console.log(args);
    Food.update({_id: id}, {$set: args}, function (err) {
        if (err) {
            callback({success: false, error: err});
        } else {
            callback({success: true});
        }
    });
};


/**
 * Find with query
 *
 * @param query     Find query
 * @param callback  Callback function
 */
function find(query, callback) {
    Food.find(query).exec(function (err, accounts) {
        if (err) {
            callback({success: false, error: err});
        } else {
            callback({success: true, accounts: accounts});
        }
    });
}

/**
 * Find single account with query
 *
 * @param query     Find query
 * @param callback  Callback function
 */
function findOne(query, callback) {
    Food.findOne(query).exec(function (err, account) {
        if (err) {
            callback({success: false, error: err});
        } else {
            if (account) {
                callback({success: true, account: account});
            } else {
                callback({success: false, error: 'Account not found'});
            }
        }
    });
}

/**
 * Checks if given email already exists in the database
 *
 * @param email     Email address to be checked
 * @param callback  Callback function, returns true if email exists in database, returns false otherwise
 */
