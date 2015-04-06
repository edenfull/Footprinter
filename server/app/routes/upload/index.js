"use strict";
var router = require("express").Router();
module.exports = router;

var multiparty = require("multiparty");
var mpMiddleware = multiparty();

router.post("/upload", mpMiddleware, function(req, res) {
		var file = req.files.file;
		console.log(file);
});

