'use strict';
 
app.factory('WineService', ['$http', '$q', function($http, $q){
    //$http.defaults.headers.post['X-CSRFToken'] = $cookies['csrftoken'];
    return {
         
            fetchWineLog: function() {
                    return $http.get('winelog/')
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching wine log');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            createLogEntry: function(entry){
                    return $http.post('winelog/', entry)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                    	//alert(JSON.stringify(errResponse));
                                    	$("#errorDiv").html(JSON.stringify(errResponse));
                                        console.error('Error while creating wine entry');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            updateLogEntry: function(wineLogEntry, id){
            	//alert( "service: " + JSON.stringify(recipe) );
            		//console.log(JSON.stringify(wineLogEntry));
                    return $http.put('winelog/'+id, wineLogEntry)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        //console.error('Error while updating recipe');
                                    	//alert(JSON.stringify(errResponse));
                                    	$("#errorDiv").html(JSON.stringify(errResponse));
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            deleteLogEntry: function(id){
            	//alert( "deleting log entry" + id );
                    return $http.delete('winelog/'+id)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting recipe');
                                        return $q.reject(errResponse);
                                    }
                            );
            }
         
    };
 
}]);