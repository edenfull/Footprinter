'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var LibrarySchema = new mongoose.Schema({
    parts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Part" }],
		dateCreated: { type: Date, required: true },
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

mongoose.model('Library', LibrarySchema);
