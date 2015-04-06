"use strict";
var router = require("express").Router();
module.exports = router;

var multer = require("multer");
var done = false;

// router.use(multer({ dest: "./public/uploads",
// 										rename: function(fieldName, fileName) {
// 												return fileName + Date.now();
// 										},
// 										onFileUploadStart: function(file) {
// 												console.log(file.originalName + " is starting...");
// 										},
// 										onFileUploadComplete: function(file) {
// 												console.log(file.fieldName + " uploaded to " + file.path);
// 												done = true;
// 										}}));

router.get("/upload", function(req, res, next) {
		console.log("hhhhh");
		res.send("Hi");
		next();
});

router.post("/upload", function(req, res) {
		if (done) {
				console.log(req.files);
				res.end("File uploaded");
		}
});

