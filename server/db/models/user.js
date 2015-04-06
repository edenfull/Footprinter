'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var validate = require("mongoose-validator");

var emailValidator = validate({ validator: "isEmail", arguments: [this], message: "Please enter a valid email address."});

var permLevelValidator = function(value) {
		return /Guest|Registered|Admin/.test(value);
};

var schema = new mongoose.Schema({
		username: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
    email: { type: String, required: true, validate: emailValidator },
		permLevel: { type: String, required: true, validate: permLevelValidator },
    password: { type: String },
    salt: { type: String },
    google: { id: String },
		libraries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Library" }]
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);
