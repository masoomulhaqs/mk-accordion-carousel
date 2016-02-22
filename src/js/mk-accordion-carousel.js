var mkACApp = angular.module('mkAccordionCarousel', []);

mkACApp.service('mkAC', [function () {
  this.itemsList = [];
  this.orderCarousel = function(element){
      console.log('### WOW ###');
      var parentElem = element.parent(), total, offset, rightOffset, defOffset = 20;
      total = parentElem.children().length;
      rightOffset = defOffset*total;
      offset=rightOffset;
      for(var index=0; index<total;index++){
        parentElem.children().eq(index).css({
          top: rightOffset+'px',
          right: rightOffset+'px',
          left: offset-rightOffset+'px',
          zIndex: 100-index
        });
        rightOffset = rightOffset - defOffset;
      }
     if(!parentElem.hasClass('unfresh-carousel')){
        for(var index=0; index<total;index++){
          parentElem.children().eq(index).addClass('item'+(index+1));
        }
        parentElem.addClass('unfresh-carousel');
     }
  } 
  this.reorderCarousel = function($event){
    var curr = angular.element($event.currentTarget);
    curr.parent().prepend(curr);
    this.orderCarousel(curr);
  }
}]);

mkACApp.controller('mkACCtrl', function($scope, mkAC){
  // $scope.$watch(function(){
  //   return mkBlocker.isBlocked;
  // }, function(){
  //   $scope.isBlocked = mkBlocker.isBlocked;
  // });
  $scope.orderCarousel = function(element){
    console.log(angular.element(element));
    mkAC.orderCarousel(element);
  }
  $scope.reorderCarousel = function($event){
    mkAC.reorderCarousel($event);
  }
});

mkACApp.directive('mkItem', [function () {
   return {
      restrict: 'AE',
      controller: 'mkACCtrl',
      link: function (scope, element, iAttrs) {
        if(scope.$last) {
          scope.orderCarousel(element);
        }
      }
   };
 }]);