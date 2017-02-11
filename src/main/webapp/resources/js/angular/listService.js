'use strict';
 
app.factory('ListService', ['$http', '$q', function($http, $q){
    return {
    
            fetchLists: function() {
                    return $http.get('list/')
                            .then(
                                    function(response){
                                    	console.log("ListService.fetchLists called");
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching users'+ JSON.stringify(errResponse));
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            saveList: function(list){
                    return $http.post('list/', list)
                            .then(
                                    function(response){
                                    	console.log("List saved");
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                    	$("#errorDiv").html(JSON.stringify(errResponse));
                                        console.error('Error while creating wine entry');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            deleteList: function(id){
            	console.log("listService->deleteList. id=" + id);
                    return $http.delete('list/'+ id)
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