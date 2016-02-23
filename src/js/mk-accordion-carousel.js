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

mkACApp.controller('mkACCtrl', function($scope ,$interval ,mkAC){
  // $scope.$watch(function(){
  //   console.log(mkAC.itemsList);
  //   return mkAC.itemsList;
  // }, function(){
  //   console.log("changed");
  //   // $scope.isBlocked = mkBlocker.isBlocked;
  // });
  $scope.items = [];
  console.log($scope.items);
  $scope.checkItems = function(obj, element){
    // mkAC.itemsList = obj;
    $scope.items = obj;

    console.log(obj.length);
    if(obj.length>0){
      console.log($scope.items);
      mkAC.orderCarousel(element);
    }
  }
  $scope.orderCarousel = function(element){
    console.log($scope.items);
    mkAC.orderCarousel(element);
  }
  $scope.reorderCarousel = function($event, item, itemsArray){
    // mkAC.reorderCarousel($event);
    // mkAC.itemsList.unshift(item);
    // index = mkAC.itemsList.indexOf(item);
    // if(index !== -1){
    //   mkAC.itemsList.splice(index, 1);
    //   mkAC.itemsList.unshift(item);
    // }
    // index = itemsArray.indexOf(item);
    // if(index !== -1){
    //   itemsArray.splice(index, 1);
    //   itemsArray.unshift(item);
    // }
    mkAC.reorderCarousel($event);
    // console.log(mkAC.itemsList);
  }
});

mkACApp.directive('mkItem', [function () {
   return {
      restrict: 'AE',
      controller: 'mkACCtrl',
      link: function (scope, element, attrs) {
        if(scope.$last) {
          var obj = scope.$eval(attrs.mkItems);
          console.log(obj);
          scope.checkItems(obj, element);
        }
      }
   };
 }]);