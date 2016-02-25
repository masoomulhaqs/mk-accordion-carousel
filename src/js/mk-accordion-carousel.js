var mkACApp = angular.module('mkAccordionCarousel', []);

mkACApp.service('mkAC', [function () {
  this.currentItem = null;
  this.currentTarget = null;
  this.carouselItems = [];
  this.newCarouselItems = [];
  this.isEditableCarousel = false;
  this.solidColors = false;
  var config = {
      'offsetSidePosition': 20,
      'offsetTotalItems': 7,
      'virginityCheckClass': 'carousel-inititalized',
      'itemBaseClass': 'item',
      'itemActiveClass': 'item-active'
  };
  this.initAccordion = function(element){
    /*** Setting Defaults ***/
    config.parentElem = element.parent();
    config.childElems = config.parentElem.children();
    config.totalItems = config.parentElem.children().length;
    config.parentHeight = config.childElems[0].offsetHeight + (config.offsetSidePosition*(config.totalItems+1));

    if(!this.solidColors){
      for(var index=0; index<config.totalItems; index++){
        config.childElems.eq(index).addClass(config.itemBaseClass + (index%config.offsetTotalItems + 1));
      }
    }

    config.parentElem.css('height', config.parentHeight+'px');

    this.orderAccordion(element);
  }

  this.orderAccordion = function(element){
      /**** Declaring Variables ****/
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

  this.reorderAccordion = function($event){
    var curr = angular.element($event.currentTarget);
    curr.parent().prepend(curr);  
    this.orderAccordion(curr);
  }

  this.activeIndex = function(item){
    var index = this.carouselItems.indexOf(item);
    return index;
  }

  this.toggleEditableCarousel = function(){
    this.isEditableCarousel = !this.isEditableCarousel;
    return this.isEditableCarousel;
  }
}]);

mkACApp.controller('mkCarouselCtrl', function($scope, mkAC){
  $scope.initItems = function(obj){
    if(angular.isDefined(obj) && obj.length>0){
      mkAC.solidColors = $scope.solidColors;
      mkAC.carouselItems = angular.copy(obj);
      mkAC.currentItem = obj[0];
    }
  }
});

mkACApp.controller('mkItemCtrl', function($scope, mkAC){
  $scope.initAccordion = function(element){
    mkAC.currentTarget = element;
    mkAC.newCarouselItems = mkAC.carouselItems;
    mkAC.initAccordion(element);
  }
  $scope.reorderAccordion = function($event, item){
    if(mkAC.currentItem != item){
      mkAC.currentItem = item;
      mkAC.currentTarget = $event.currentTarget;
      var index = mkAC.newCarouselItems.indexOf(item);
      if(index != -1){
        mkAC.newCarouselItems.splice(index,1);
        mkAC.newCarouselItems.unshift(item);
        mkAC.carouselItems = mkAC.newCarouselItems;
      }
      mkAC.reorderAccordion($event);
      mkAC.activeIndex(item);
    }
  }
  $scope.activeIndex = function(item){
    mkAC.activeIndex(item);
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
    controller: 'mkCarouselCtrl',
    link: function (scope, element, attrs) {
      scope.initItems(scope.carouselItems);
    }
  };
}]);

mkACApp.directive('mkItem', [function () {
   return {
      restrict: 'A',
      controller: 'mkItemCtrl',
      link: function (scope, element, attrs) {
        if(scope.$last) {
          scope.initAccordion(element.parent().children().eq(0));
        }
      }
   };
 }]);