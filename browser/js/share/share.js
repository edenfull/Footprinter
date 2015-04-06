app.config(function ($stateProvider) {
    $stateProvider.state('share', {
        url: '/share',
        templateUrl: 'js/share/share.html',
        controller: 'ShareCtrl'
    });

});

app.controller('ShareCtrl', ['$scope', '$upload', function ($scope, $upload) {
		$scope.files;
		
		$scope.upload = function($files) {
				console.log($files);
				
				if ($files && $files.length) {		
						for (var i = 0; i < $files.length; i++) {
								var file = $files[i];

								$scope.upload = $upload.upload({
										url: '/api/upload',
										method: 'POST',
										file: $files[i]
								}).progress(function(evt) {
										console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
								}).success(function(data, status, headers, config) {
										console.log(data);
								});
						}		
				}
		};
}]);
