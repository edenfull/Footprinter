"use strict";

app.factory("UploadFactory", function($http) {
		var factory = {};

		factory.uploadFile = function(file) {
				return $http.post("/api/upload").then(function(res) {
						return res.data;
				});
		};

		return factory;
});
