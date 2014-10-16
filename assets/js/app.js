var captcha = angular.module('captcha', [])
	.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
		$scope.title = 'Captcha Demo';

		//Setup Canvas element
		var canvas = document.getElementById("canvas");  
		var ctx = canvas.getContext("2d");  

		//Generate random RGB colors
		randomColor = function(){
		    var r = Math.floor(Math.random()*256);
		    var g = Math.floor(Math.random()*256);
		    var b = Math.floor(Math.random()*256);
		    return "rgb("+ r + "," + g + "," + b +")";
		}

		//Convert text from string passed to a picture. Different letters will have different font colors
		fontColor = function(str, x, y){
		    for(var i = 0; i <= str.length; ++i){
		        var ch = str.charAt(i);
		        ctx.fillStyle = randomColor();
		        ctx.font="50px Arial";
		        ctx.fillText(str.charAt(i), x, y);
		        x += ctx.measureText(ch).width;
		    }
		}

		//Main function for app. Sends a GET request to the backend to get new captcha, clear the input box, and clear the canvas element
		$scope.getCaptcha = function() {
			$scope.attempt = '';

			$http.get('/gen')
			  .success(function(data, status, headers, config) {
			    $scope.captcha = data.captcha;
			    $scope.sessionID = data.sessionID;

			    ctx.clearRect(0,0,canvas.width,canvas.height)

			    fontColor($scope.captcha, 0, 50);
			  })
			  .error(function(data, status, headers, config) {
			    //Put something here
			  });
		}

		//Validates the captcha
		$scope.checkCaptcha = function() {
			$http.post('/check', {captcha: $scope.attempt, sessID: $scope.sessionID})
				.success(function(data, status, headers, config) {
				    if (data.status == 'error') {
				    	alert("Wrong captcha!");
				    	$scope.getCaptcha();
				    }
				    else {
				    	alert("You got it!");
				    	$scope.getCaptcha();
				    }
				})
				.error(function(data, status, headers, config) {
					console.log(data);
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				    alert("Wrong captcha!");
				    $scope.getCaptcha();
				});
		}

		$scope.getCaptcha();


	}]);