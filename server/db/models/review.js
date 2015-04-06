'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
    rating: { type: Number, min: 1, max: 5, required: true },
		comment: { type: String },
		userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }
});

mongoose.model('Review', ReviewSchema);
