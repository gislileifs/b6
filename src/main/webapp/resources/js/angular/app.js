'use strict';
 
var app = angular.module('myApp',['ngMaterial','ngMessages','ngAnimate']).config( ['$sceDelegateProvider','$mdDateLocaleProvider', 
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
	   
/*
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
	*/
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
	
	
app.controller('NavCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', function ($scope, $timeout, $mdSidenav, $log) {
	  $scope.recipesDisplayed = false;
	  $scope.winelogDisplayed = true;
	  $scope.template = "resources/js/angular/recipes.jsp";

	    $scope.toggleLeft = buildDelayedToggler('left');
	    $scope.toggleRight = buildToggler('right');
	    
		  $scope.showRecipes = function() {
			  //alert( "R: " + $scope.recipesDisplayed + ", W: " + $scope.winelogDisplayed );
			  $scope.winelogDisplayed = false;
			  $scope.recipesDisplayed = true;
			  $scope.template = "resources/js/angular/recipes.jsp";
		      $mdSidenav('left').close()
		  }

		  $scope.showWinelog = function() {
			  //alert( "R: " + $scope.recipesDisplayed + ", W: " + $scope.winelogDisplayed );

			  $scope.recipesDisplayed = false;
			  $scope.winelogDisplayed = true;
			  $scope.template = "resources/js/angular/winelog.jsp";
		      $mdSidenav('left').close()
		  }
	    
	    $scope.isOpenRight = function(){
	      return $mdSidenav('right').isOpen();
	    };

	    //
	    // Supplies a function that will continue to operate until the
	    // time is up.
	    //
	    function debounce(func, wait, context) {
	      var timer;

	      return function debounced() {
	        var context = $scope,
	            args = Array.prototype.slice.call(arguments);
	        $timeout.cancel(timer);
	        timer = $timeout(function() {
	          timer = undefined;
	          func.apply(context, args);
	        }, wait || 10);
	      };
	    }

	    //
	    // Build handler to open/close a SideNav; when animation finishes
	    // report completion in console
	    //
	    function buildDelayedToggler(navID) {
	      return debounce(function() {
	        // Component lookup should always be available since we are not using `ng-if`
	        $mdSidenav(navID)
	          .toggle()
	          .then(function () {
	            $log.debug("toggle " + navID + " is done");
	          });
	      }, 200);
	    }

	    function buildToggler(navID) {
	      return function() {
	        // Component lookup should always be available since we are not using `ng-if`
	        $mdSidenav(navID)
	          .toggle()
	          .then(function () {
	            $log.debug("toggle " + navID + " is done");
	          });
	      }
	    }
	  }])
	  .controller('LeftCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', function ($scope, $timeout, $mdSidenav, $log) {
		  		  
	    $scope.close = function () {
	      // Component lookup should always be available since we are not using `ng-if`
	      $mdSidenav('left').close()
	        .then(function () {
	          $log.debug("close LEFT is done");
	        });

	    };
	  }])
	  .controller('RightCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', function ($scope, $timeout, $mdSidenav, $log) {
	    $scope.close = function () {
	      // Component lookup should always be available since we are not using `ng-if`
	      $mdSidenav('right').close()
	        .then(function () {
	          $log.debug("close RIGHT is done");
	        });
	    };
	  }]);


	/**
	Copyright 2016 Google Inc. All Rights Reserved. 
	Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
	**/

app.directive('myDocumentClick', 
	    ['$window', '$document', '$log',
	    function($window, $document, $log) {
	      return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	          $document.bind('keypress', function(event) {
	            if( event.keyCode == 27 ) {
	            	alert("x");
	            }
	            /*if (angular.element(event.target).hasClass('myClass')) {
	              $window.alert('Foo!');
	            }*/
	          })
	        }
	      };
	    }
	  ]);

app.controller('Controller', ['$scope', '$timeout', function($scope, $timeout) {
		  $scope.name = 'Tobias';
		  $scope.message = '';
		  $scope.hideDialog = function(message) {
		    $scope.message = message;
		    $scope.dialogIsHidden = true;
		    $timeout(function() {
		      $scope.message = '';
		      $scope.dialogIsHidden = false;
		    }, 2000);
		  };
		}]);
/*
app.directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {

	  function link(scope, element, attrs) {
	    var format,
	        timeoutId;

	    function updateTime() {
	      element.text(dateFilter(new Date(), format));
	    }

	    scope.$watch(attrs.myCurrentTime, function(value) {
	      format = value;
	      updateTime();
	    });

	    element.on('$destroy', function() {
	      $interval.cancel(timeoutId);
	    });

	    // start the UI update process; save the timeoutId for canceling
	    timeoutId = $interval(function() {
	      updateTime(); // update DOM
	    }, 1000);
	  }

	  return {
	    link: link
	  };
	}]);
	*/

app.directive('myDialog', function() {
	  return {
		    restrict: 'E',
		    transclude: true,
		    scope: {
		      'close': '&onClose'
		    },
		    templateUrl: 'resources/js/angular/myDialog.html'
		  };
		});


/****/
app.controller('DlgCtrl', ['$scope','$mdDialog', function($scope, $mdDialog) {
  $scope.status = '  ';
  $scope.customFullscreen = false;

  $scope.showAlert = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('This is an alert title')
        .textContent('You can specify some description text in here.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );
  };

  $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Would you like to delete your debt?')
          .textContent('All of the banks have agreed to forgive you your debts.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Please do it!')
          .cancel('Sounds like a scam');

    $mdDialog.show(confirm).then(function() {
      $scope.status = 'You decided to get rid of your debt.';
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  };

  $scope.showPrompt = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .title('What would you name your dog?')
      .textContent('Bowser is a common name.')
      .placeholder('Dog name')
      .ariaLabel('Dog name')
      .initialValue('Buddy')
      .targetEvent(ev)
      .ok('Okay!')
      .cancel('I\'m a cat person');

    $mdDialog.show(confirm).then(function(result) {
      $scope.status = 'You decided to name your dog ' + result + '.';
    }, function() {
      $scope.status = 'You didn\'t name your dog.';
    });
  };

  $scope.showAdvanced = function(ev) {
	  //alert("kjkj");
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'resources/js/angular/myDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  $scope.showTabDialog = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'tabDialog.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
  };

  $scope.showPrerenderedDialog = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      contentElement: '#myDialog',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };
  
  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
  
  DialogController.$inject = ['$scope','$mdDialog'];
}]);


	