var fs = require("fs"),
		xmljs = require("xml2js"),
		Promise = require("bluebird"),
		mongoose = require("mongoose");

var parser = new xmljs.Parser(),
		builder = new xmljs.Builder();

mongoose.connect("mongodb://localhost/Footprinter").connection;
require("../../db/models/review.js");
require("../../db/models/data.js");
require("../../db/models/library.js");
require("../../db/models/part.js");
require("../../db/models/user.js");

var Part = mongoose.model("Part"),
		Data = mongoose.model("Data");


var rawData;

var parseXML = function(lbrPath) {
		return new Promise(function(resolve, reject) {
				fs.readFile(lbrPath, function(err, data) {
						parser.parseString(data, function(err, result) {
								rawData = result;
								resolve(result);	
						});
				});	
		});	
};

var splitAndStore = function(part) {
		var partName;
		if (part) partName = part["$"].name;
		
		var desc;
		if (part.hasOwnProperty("description")) desc = part.description[0];

		var trimmed = rawData;
		trimmed.eagle.drawing[0].library[0].packages[0].package = [];
		trimmed.eagle.drawing[0].library[0].packages[0].package.push(part);
		
		var shortenedObj = new Data({
				text: JSON.stringify(trimmed),
				date: Date.now()
		});
		
		var newPart = new Part({
				partName: partName,
				description: desc,
				eagle: shortenedObj
		});

		
		//newPart.save();
};

var octoSearch = function(keyword) {
		var url = "http://octopart.com/api/v3/parts/search";
    url += "?callback=?";

    url += "&apikey=52a02872";

    var args = {
        q: "solid state relay",
        start: 0,
        limit: 10
    };

    $.getJSON(url, args, function(search_response) {
        // print original request
        console.log(search_response['request']);

        // iterate through results
        $.each(search_response['results'], function(i, result){
            var part = result['item'];

            // print matched part items
            console.log(part['brand']['name'] + ' - ' + part['mpn']);
        });
    });
};

var addPackagesToDB = function(data) {
		var lib = data.eagle.drawing[0].library[0];

		splitAndStore(lib.packages[0].package[1]);
		// lib.packages[0].package.forEach(function(part) {
		// 		splitAndStore(part);
		// });

//		console.log(lib.symbols);
		
		for (var i in lib.symbols) {
				
		}

		for (var i in lib.devicesets) {
				
		}
};

parseXML("/Users/edenfull/Dropbox/CurrentFiles/Fullstack/Footprinter/seed/adafruit.lbr")
		.then(function(data) {
				addPackagesToDB(data);		
		});

