/*---------modified for TMO--------*/

'use strict'; 


app.factory('Offer', function($resource,$http) {

	console.log('Offer factory loaded')
return $resource('/offer/:itemId', {},
    {
        'findOffers': {method: 'GET', isArray:true},
        'deleteOffer': {method: 'DELETE',params: {taskId: '@id'}},
        //'updateOffer': { method:'PUT',params: {offerId: '@id'} }
        
    });


});

app.factory('OfferSvc', function($http) {

var OfferSvc = {

	updateOffer: function(url,payload) {
        return $http.put(url,payload)

        }

}

return OfferSvc


}); //--- end OfferSvc factory
