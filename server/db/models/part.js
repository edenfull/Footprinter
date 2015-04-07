'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var Data = mongoose.model("Data"),
		Review = mongoose.model("Review");

var PartSchema = new mongoose.Schema({
		partName: { type: String },
		description: { type: String },
    mpn: { type: String },
    sku: { type: String },
    brand: { type: String },
    octopart: { type: String },
		eagle: [Data.schema],
		reviews: [Review.schema],
		usersDownloaded: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

mongoose.model("Part", PartSchema);
