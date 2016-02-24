var mkACApp = angular.module('mkAccordionCarousel', []);

mkACApp.service('mkAC', [function () {
  this.currentItem = null;
  this.currentTarget = null;
  this.itemsList = [];
  this.isEditableCarousel = false;
  this.orderAccordion = function(element){
      /**** Declaring Variables ****/
      var currElem = element,
          parentElem = currElem.parent(), 
          childElems = parentElem.children(),
          total = parentElem.children().length,
          defOffset = 20,
          totalOffset = 7,
          rightOffset = defOffset*total,
          onCheckClass = 'carousel-inititalized',
          activeClass = 'item-active',
          parentHeight = childElems[0].offsetHeight + (defOffset*(total+1));

      childElems.eq(0).css('cursor', 'default');
      parentElem.css('height', parentHeight+'px');

      for(var index=0; index<total;index++){
        childElems.eq(index).css({
          top: rightOffset+'px',
          right: rightOffset+'px',
          left: defOffset*(total+1) - rightOffset +'px',
          zIndex: 100-index
        }).removeClass(activeClass);
        rightOffset = rightOffset - defOffset;
      }

      currElem.addClass(activeClass);
      
      if(!parentElem.hasClass(onCheckClass)){
        for(var index=0; index<total;index++){
          childElems.eq(index).addClass('item'+(index%totalOffset + 1));
        }
        parentElem.addClass(onCheckClass);
      }
  } 
  this.reorderAccordion = function($event){
    var curr = angular.element($event.currentTarget);
    curr.parent().prepend(curr);
    this.orderAccordion(curr);
  }
}]);

mkACApp.controller('mkACCtrl', function($scope, mkAC){
  $scope.initAccordion = function(obj, element){
    if(angular.isDefined(obj) && obj.length>0){
      mkAC.itemsList = obj;
      mkAC.currentItem = obj[0];
      element = element.parent().children().eq(0);
      mkAC.currentTarget = element;
      mkAC.orderAccordion(element);
    }
  }
  $scope.reorderAccordion = function($event, item){
    if(mkAC.currentItem != item){
      mkAC.currentItem = item;
      mkAC.currentTarget = $event.currentTarget;
      mkAC.reorderAccordion($event);
    }
  }
  $scope.isActiveItem = function(item){
    return (mkAC.currentItem == item)?true:false;
  }
});

mkACApp.directive('mkItem', [function () {
   return {
      restrict: 'A',
      controller: 'mkACCtrl',
      link: function (scope, element, attrs) {
        if(scope.$last) {
          var obj = scope.$eval(attrs.mkItem);
          scope.initAccordion(obj, element);
        }
      }
   };
 }]);