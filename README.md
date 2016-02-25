# mk-accordion-carousel
AngularJS Accordion Carousel

##### Install with bower	
```
    $ bower install mk-accordion-carousel
```

#### HTML markup
1. Add `mk-accordion-carousel` to the parent
2. Add `mk-item` directive to reoeat elements and add `data-ng-click="reorderAccordion($event, item);"` to the repeat element .

```html
	<div mk-accordion-carousel 
		carousel-items="dummyArray" <!-- Pass the object to carousel-items -->
		solid-colors="false" <!-- Colored stacks will be displayed if this is true -->
		class="mk-accordion-carousel">
		<div class="item" mk-item
			data-ng-repeat="item in dummyArray"
			data-ng-click="reorderAccordion($event, item);">
			<div class="panel panel-box">
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
