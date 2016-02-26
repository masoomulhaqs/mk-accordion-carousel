var mkACApp = angular.module('mkAccordionCarousel', []);

mkACApp.service('mkAC', ['$timeout', function ($timeout) {
  var config = {
      'offsetSidePosition': 20,
      'offsetTotalItems': 7,
      'virginityCheckClass': 'carousel-inititalized',
      'itemBaseClass': 'item',
      'itemActiveClass': 'item-active'
  }, mk = this;

  this.currentItem = null;
  this.currentTarget = null;
  this.carouselItems = [];
  this.isEditableCarousel = false;
  this.solidColors = false;
  this.isStackable = false;

  this.initAccordion = function(element){
    /*** Setting Defaults ***/
    config.parentElem = element.parent();
    config.childElems = config.parentElem.children();
    config.totalItems = config.parentElem.children().length;
    config.parentHeight = config.childElems[0].offsetHeight + (config.offsetSidePosition*(config.totalItems+1));

    config.parentElem.css('height', config.parentHeight+'px');

    if(!this.solidColors){
      for(var index=0; index<config.totalItems; index++){
        config.childElems.eq(index).addClass(config.itemBaseClass + (index%config.offsetTotalItems + 1));
      }
    }

    if(config.totalItems > 1){
      this.isStackable = true;
      this.orderAccordion(element);
    }
  }

  this.orderAccordion = function(element){
      if(this.isStackable){
        var childElems = config.parentElem.children();
        config.varibleSidePosition = config.offsetSidePosition*config.totalItems;

        for(var index=0; index<config.totalItems; index++){
          childElems.eq(index).css({
            top: config.varibleSidePosition+'px',
            right: config.varibleSidePosition+'px',
            left: config.offsetSidePosition*(config.totalItems+1) - config.varibleSidePosition +'px',
            cursor: 'pointer',
            zIndex: 100-index
          }).removeClass(config.itemActiveClass);
          config.varibleSidePosition = config.varibleSidePosition - config.offsetSidePosition;
        }
        
        element.addClass(config.itemActiveClass).css('cursor', 'default');
      }
  }

  this.reorderItems = function($event, item){
    if(this.isStackable && this.currentItem != item){
      this.currentItem = item;
      this.currentTarget = $event.currentTarget;
      var index = this.carouselItems.indexOf(item);

      if(index != -1){
        this.carouselItems.splice(index,1);
        this.carouselItems.unshift(item);
        $timeout(function(){
          mk.orderAccordion(angular.element(mk.currentTarget));
        }, 0);
      }
    }
    return this.carouselItems;
  }

  this.reorderAccordion = function($event, item){
    if(this.isStackable){
      this.currentItem = item;
      this.currentTarget = $event.currentTarget;
      var curr = angular.element($event.currentTarget);
      this.reorderItems($event, item);
      // curr.parent().prepend(curr); 
      // this.orderAccordion(curr);
    }
  }

  this.activeIndex = function(item){
    return (this.isStackable)?this.carouselItems.indexOf(item):0;
  }

  this.toggleEditableCarousel = function(){
    this.isEditableCarousel = (this.isStackable)?!this.isEditableCarousel:false;
    return this.isEditableCarousel;
  }
}]);

mkACApp.controller('mkCarouselCtrl', function($scope, mkAC){
  $scope.initItems = function(obj){
    if(angular.isDefined(obj)){
      mkAC.solidColors = $scope.solidColors;
      mkAC.carouselItems = angular.copy(obj);
      mkAC.currentItem = obj[0];
    }
  }
});

mkACApp.controller('mkItemCtrl', function($scope, $timeout, mkAC){
  $scope.initAccordion = function(element){
    mkAC.currentTarget = element;
    mkAC.initAccordion(element);
  }
  $scope.reorderItems = function($event, item){
    return mkAC.reorderItems($event, item);
  }
  $scope.activeIndex = function(item){
    return mkAC.activeIndex(item);
  }
  $scope.isActiveItem = function(item){
    return (mkAC.currentItem == item)?true:false;
  }
  $scope.toggleEditableCarousel = function(){
    return mkAC.toggleEditableCarousel();
  }
});

mkACApp.directive('mkAccordionCarousel', [function () {
  return {
    restrict: 'A',
    scope: {
      carouselItems: '=',
      solidColors: "="
    },
    priority: 1000,
    controller: 'mkCarouselCtrl',
    link: function (scope, element, attrs) {
      scope.initItems(scope.carouselItems);
    }
  };
}]);

mkACApp.directive('mkItem', [function () {
   return {
      restrict: 'A',
      priority: 900,
      require: '^mkAccordionCarousel',
      controller: 'mkItemCtrl',
      link: function (scope, element, attrs) {
        if(scope.$last) {
          scope.initAccordion(element.parent().children().eq(0));
        }else if(angular.isUndefined(scope.$last)){
          scope.initAccordion(element);
        }
      }
   };
 }]);