var mongoose = require("mongoose"),
		async = require("async");

mongoose.connect("mongodb://localhost/Footprinter").connection;

require("./server/db/models/review.js");
require("./server/db/models/data.js");
require("./server/db/models/library.js");
require("./server/db/models/part.js");
require("./server/db/models/user.js");

var Review = mongoose.model("Review"),
		User = mongoose.model("User");

var userData = [
		{ username: "admin", firstName: "Admin", lastName: "Admin", email: "admin@admin.com", permLevel: "Admin", password: "password"},
		{ username: "edenfull", firstName: "Eden", lastName: "Full", email: "spacecamper@gmail.com", permLevel: "Registered", password: "password" }
];

mongoose.connection.on('open', function() {
    mongoose.connection.db.dropDatabase(function() {
				console.log("Adding Data");
				async.each(userData, function (user, firstDone) {
						User.create(user, firstDone);	
				},function (err){
						console.log("Finished With Users");
						User.findOne({ username: "Admin" } , function (err, adminUser){
	    					console.log("Control-C to exit because I'm too lazy to implement a function to end this.");
						});
				});
    });
});
