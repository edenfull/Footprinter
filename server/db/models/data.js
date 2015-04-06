'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var DataSchema = new mongoose.Schema({
    text: { type: String },
		date: { type: Date, required: true },
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("Data", DataSchema);
