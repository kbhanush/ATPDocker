'use strict'; 


app.factory('Comment', function($resource) {

return $resource('/comment/:itemId', {},
    {
        'addComment': {method: 'POST'},
        'findComments': {method: 'GET', isArray:true},
        'deleteComment': {method: 'DELETE',params: {taskId: '@id'}}
        
        
    });

});