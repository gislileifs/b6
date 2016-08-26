'use strict';
 
var app = angular.module('myApp',['ngMaterial','ngMessages']).config( ['$sceDelegateProvider','$mdDateLocaleProvider', 
                                                                       function($sceDelegateProvider, $mdDateLocaleProvider) {
	  $sceDelegateProvider.resourceUrlWhitelist([
	                                     	    // Allow same origin resource loads.
	                                     	    'self',
	                                     	    // Allow loading from our assets domain.  Notice the difference between * and **.
	                                     	    'http://srv*.assets.example.com/**',
	                                     	    'http://visir.is/**',
	                                     	    'http://www.bbcgoodfood.com/**'
	                                     	  ]);
	  $mdDateLocaleProvider.formatDate = function(date) {
		    return date ? moment(date).format('DD.MM.YYYY') : '';
		  };
		  $mdDateLocaleProvider.parseDate = function(dateString) {
			    var m = moment(dateString, 'DD.MM.YYYY', true);
			    return m.isValid() ? m.toDate() : new Date(NaN);
			};
	   }]);

app.controller('AppCtrl', ['$scope', function($scope) {
	       	  $scope.myDate = new Date();

	    	  $scope.minDate = new Date(
	    	      $scope.myDate.getFullYear(),
	    	      $scope.myDate.getMonth() - 2,
	    	      $scope.myDate.getDate());

	    	  $scope.maxDate = new Date(
	    	      $scope.myDate.getFullYear(),
	    	      $scope.myDate.getMonth() + 2,
	    	      $scope.myDate.getDate());

	    	  $scope.onlyWeekendsPredicate = function(date) {
	    	    var day = date.getDay();
	    	    return day === 0 || day === 6;
	    	  };
	    	}]);
	   

	app.directive('helloWorld', function() {
		  return {
		    restrict: 'AE',
		    //replace: true,
		    template: '<p style="background-color:{{color}}">Hello World',
		    link: function(scope, elem, attrs) {
		      elem.bind('click', function() {
		        elem.css('background-color', 'white');
		        scope.$apply(function() {
		          scope.color = "white";
		        });
		      });
		      elem.bind('mouseover', function() {
		        elem.css('cursor', 'pointer');
		      });
		    }
		  };
		});
	
	app.directive('setFocus', function(){
		  return{
		      scope: {setFocus: '='},
		      link: function(scope, element){
		         if(scope.setFocus) element[0].focus();             
		      }
		  };
		});
	
	app.directive('focusable', function() {
	    return {
	        restrict: 'A',
	        scope: {
	            focusable: '@'
	        },
	        link: function(scope, elm, attrs) {
	            scope.$watch('focusable', function (value) {
	                if (value) {
	                    elm[0].focus();
	                }
	            });
	        }
	    };
	});
	
	app.directive('focus', ["$timeout", function ($timeout) {
	    return {
	        restrict: 'A',
	        link: function (scope, element, attrs) {
	            scope.$watch(attrs.focus, function (value) {
	                if (value) {
	                    $timeout(function() { element[0].focus(); });
	                }
	            });
	        }
	    };
	}]);
	

	