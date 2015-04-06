app.config(function ($stateProvider) {
    $stateProvider.state('share', {
        url: '/share',
        templateUrl: 'js/share/share.html',
        controller: 'ShareCtrl'
    });

});

app.controller('ShareCtrl', function ($scope, UploadFactory) {
		$scope.upload = function() {
				UploadFactory.uploadFile($scope.file);		
		};
});
