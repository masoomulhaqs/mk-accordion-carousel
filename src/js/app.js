/**
* testApp Module
*
* Description
*/
var app = angular.module('testApp', ['mkAccordionCarousel']);

app.controller('TestCtrl', ['$scope' ,'mkAC' , function ($scope, mkAC) {
	$scope.dummyText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid itaque voluptate, facere, sunt illum culpa consequuntur ipsa praesentium non atque quibusdam doloremque omnis nobis alias debitis temporibus id consectetur nostrum.";
	$scope.createDummyArray = function(text, len){
		var arr = [], i=0;
		while (i < len) {
			temp = "";
			tLen  = Math.floor(Math.random()*5);
			while (tLen > 0) {
				temp = text + temp; tLen--;
			}
			test = (temp=='')?text:temp;
			arr.push(i+1+'. '+ test); i++;
		}
		return arr;
	};
	$scope.dummyArray = $scope.createDummyArray($scope.dummyText, 5);
}]);