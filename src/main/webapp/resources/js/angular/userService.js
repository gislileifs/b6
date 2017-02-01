'use strict';
 
app.factory('WineService', ['$http', '$q', function($http, $q){
    return {
         
            fetchUsersg: function() {
                    return $http.get('user/')
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
             
            saveUser: function(user){
                    return $http.post('user/', user)
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
             
            deleteUser: function(id){
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