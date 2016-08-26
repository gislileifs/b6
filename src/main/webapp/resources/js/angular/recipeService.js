'use strict';
 
app.factory('RecipeService', ['$http', '$q', function($http, $q){
    //$http.defaults.headers.post['X-CSRFToken'] = $cookies['csrftoken'];
    return {
         
            fetchAllRecipes: function() {
                    return $http.get('recipe/')
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching recipes');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            createRecipe: function(recipe){
                    return $http.post('recipe/', recipe)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                    	//alert(JSON.stringify(errResponse));
                                    	$("#errorDiv").html(JSON.stringify(errResponse));
                                        console.error('Error while creating recipe');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            updateRecipe: function(recipe, id){
            	//alert( "service: " + JSON.stringify(recipe) );
                    return $http.put('recipe/'+id, recipe)
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
             
            deleteRecipe: function(id){
                    return $http.delete('recipe/'+id)
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