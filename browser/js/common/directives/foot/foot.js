"use strict";
app.directive("foot", function($rootScope, AuthService, AUTH_EVENTS, $state) {
		return {
				restrict: "E",
				scope: {},
				templateUrl: "js/common/directives/foot/foot.html"
		};
});
