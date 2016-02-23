# mk-accordion-carousel
An Accordion Carousel

##### Install with bower	
```
    $ bower install mk-accordion-carousel
```

#### HTML markup
1. Add `mk-item` directive and pass the repeat array to it.
2. Add `data-ng-click="reorderAccordion($event, item);"` to the repeat element .
```html
	<div class="mk-accordion-carousel">
		<div class="item" mk-item="itemsList"
			data-ng-repeat="item in itemsList"
			data-ng-click="reorderAccordion($event, item);">
			<div class="panel panel-primary default-panel panel-box">
			<div class="panel-heading">
				<h3 class="text-uppercase no-margin clearfix">Title</h3>
			</div>
			<div class="panel-body">
				<div class="overflow-170">
					{{item}}
				</div>
			</div>
			<div class="panel-footer">
				<p>Footer</p>
			</div>
		</div>
		</div>
	</div>
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
