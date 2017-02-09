'use strict';
 
app.factory('UserService', ['$http', '$q', function($http, $q){
    return {
    
            fetchUsers: function() {
                    return $http.get('user/')
                            .then(
                                    function(response){
                                    	console.log("UserService.fetchUsers called");
                                    	console.log(JSON.stringify(response.data));
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
                                    	console.log("User saved");D
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                    	$("#errorDiv").html(JSON.stringify(errResponse));
                                        console.error('Error while creating wine entry');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            deleteUser: function(id){
                    return $http.delete('user/'+id)
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