# mk-accordion-carousel
An Accordion Carousel

##### Install with bower	
```
    $ bower install mk-accordion-carousel
```

##### Include dependency to your applicaiton
```javascript
	angular.module('yourModule', ['mkAccordionCarousel']);
```

##### Include mkAC service to your controller
```javascript
  	angular.controller('TestCtrl', ['$scope', 'mkAC' , function ($scope, mkAC) {
    		$scope.currentItem = mkAC.currentItem; // to get current Item
    		$scope.currentTarget = mkAC.currentTarget; // to get current Target of the Item
  	}]);
	
```
