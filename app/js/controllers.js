'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('tableCRUDCtrl', ['$scope', '$http', '$filter',
  function($scope, $http, $filter) {
    $scope.originalList = [
      {id: 1, money: 100.80, comment: "McDonalds"},
      {id: 2, money: 200.34, comment: "Андреевский"},
      {id: 3, money: -45.88, comment: "Магазин у дома"},
      {id: 4, money: 900.00, comment: "Project sold"},
      {id: 5, money: -876.00, comment: "McDonalds"},
      {id: 6, money: -325.10, comment: "Phone Megafon"},
      {id: 7, money: 566.45, comment: "Долг Илюхи"},
      {id: 8, money: 345.78, comment: "Долг Лехи"},
      {id: 9, money: -876.44, comment: "Пятерочка"},
      {id: 10, money: 234.43, comment: "Перевод от мамы"},
      {id: 11, money: -123.22, comment: "Перевод папе"},
      {id: 12, money: -666.43, comment: "Пицца на заказ"},
      {id: 13, money: 900.00, comment: "Project sold"},
      {id: 14, money: 400.00, comment: "Donate from MMORPG"},
      {id: 15, money: -200.00, comment: "Taxi"},
      {id: 16, money: 585.00, comment: "Долг Андрея"}
    ]

    //$scope.filteredList = $scope.originalList;

    $scope.config = {
      itemsPerPage: 10,
      maxPages: 5,
      fillLastPage: "yes"
    };

    $scope.totalSum = 0;

    $scope.getTotal = function(){
      $scope.totalSum = 0;
      $.each($scope.originalList, function( index, value ) {
        $scope.totalSum = parseFloat($scope.totalSum) + parseFloat(value.money);
      });
      $(".resultContainer").text($scope.totalSum);
    };

    $scope.getTotal();
    
    $scope.showFormFlag = false;

    $scope.showClearForm = function(){
      $scope.showFormFlag = true;
      $scope.itemForm.id.$setViewValue($scope.originalList.length + 1);
      $scope.itemForm.id.$render();
      $scope.itemForm.money.$setViewValue("");
      $scope.itemForm.money.$render();
      $scope.itemForm.comment.$setViewValue("");
      $scope.itemForm.comment.$render();
    };

    $scope.add = function(item) {
      $scope.failedValidationsMoney = [];
      $scope.failedValidationsComment = [];
      var errorMessage="";
                  
      if($scope.itemForm.$dirty && $scope.itemForm.$invalid){
        for(var validations in $scope.itemForm.$error){
          for(var count=0; count < $scope.itemForm.$error[validations].length; count++){
            if($scope.itemForm.$error[validations][count].$name === "money"){
              $scope.failedValidationsMoney.push(errorMessages[$scope.itemForm.$error[validations][count].$name][validations]);
            }
            if ($scope.itemForm.$error[validations][count].$name === "comment"){
              $scope.failedValidationsComment.push(errorMessages[$scope.itemForm.$error[validations][count].$name][validations]);
            }
          }
        }
        $scope.moneyErrorStyle = moneyErrorStyle;
        $scope.commentErrorStyle = commentErrorStyle;
      }else{            
        $scope.itemForm.$setPristine();
        if(typeof $scope.originalList[item.id -1] !== "undefined"){
          $scope.originalList[item.id-1].money = parseFloat($scope.item.money);
          $scope.originalList[item.id-1].comment = $scope.item.comment;
        } else {
          $scope.originalList.push({id: $scope.originalList.length + 1, money: parseFloat($scope.item.money), comment: $scope.item.comment});
        }
        //$scope.updateFilteredList();
        $scope.getTotal();
        $scope.item = {};
        $scope.showFormFlag = false;
      } 
    };

    $scope.edit = function(item) {
      $scope.itemForm.id.$setViewValue(item.id);
      $scope.itemForm.id.$render();
      $scope.itemForm.money.$setViewValue(item.money);
      $scope.itemForm.money.$render();
      $scope.itemForm.comment.$setViewValue(item.comment);
      $scope.itemForm.comment.$render();

      $scope.showFormFlag = true;
    };

    $scope.cancel = function(){
      $scope.showFormFlag = false;
      $scope.failedValidationsMoney = [];
      $scope.failedValidationsComment = [];
      var errorMessage="";
    };

    /*
    $scope.updateFilteredList = function() {
      $scope.filteredList = $filter("filter")($scope.originalList, $scope.query);
    };
    */

    var errorMessages={
      comment:function(){
            var required = "Пустое поле";
            var validComment = "Больше 512 символов";
            
            return{
              required: required,
              validComment: validComment
            };
          }(),
      money:function(){
            var required = "Пустое поле";
            var validPrice = "Неверное значение";
            
            return{
              required: required,
              validPrice:validPrice
            }
          }()         
      };

    $scope.failedValidationsMoney = [];
    $scope.failedValidationsComment = [];

    var moneyErrorStyle = {
      "border":"1px solid #ff2d01", 
      "border-radius":"5px", 
      "background-color":"#ff2d01", 
      "color":"white", 
      "text-align":"center",
      "font-weight":"bold"
  };
    var commentErrorStyle = {
      "border":"1px solid #ff2d01", 
      "border-radius":"5px", 
      "margin-top":"40px", 
      "background-color":"#ff2d01", 
      "color":"white", 
      "text-align":"center",
      "font-weight":"bold"
    };
}]);



