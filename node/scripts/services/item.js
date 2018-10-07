/*---------modified for TMO--------*/

'use strict'; 

app.factory('getItems', function(Items,$http) {

    var items = Items.getAllItems();
    var selectedItem = {};

  var getItems = {
    all: items,

    createItem: function(item) {
        $http.post('/item',item).success(function(item){
            console.log('item api returned',item)
            items.push(item)
            console.log('http recd',item)
        })

    },

    editItem: function(url,payload) {
        return $http.put(url,payload)

        },

        updateItemArray: function(item) {
            for (var t=0;t<getItems.all.length;t++){
                if (getItems.all[t].ITEM_ID == item.ITEM_ID){getItems.all[t] = item}
            }
                
                
        },

    setSelectedItem: function(item) { 

        selectedItem = item;
        console.log('selectedItem within setSelectedItem is:',selectedItem)

         },
        
        

    getSelectedItem: function() {
        console.log('selected item within getSelectedItem', selectedItem)
        return selectedItem;
    }

}
return getItems;

});

	

//---------working code --------------------


app.factory('Items', function($resource) {
console.log('Items factory loaded')

return $resource('/item', {},
    {
        'getAllItems': {method: 'GET', isArray:true},
        'newItem': {method: 'POST'}
        
    })


});


app.factory('Item', function($resource) {

	console.log('Item factory loaded')
return $resource('/item/:itemId', {},
    {
        'findItem': {method: 'GET'},
        'deleteItem': {method: 'DELETE',params: {itemId: '@id'}},
        'updateItem': { method:'PUT',params: {itemId: '@id'} }
        
    });

});
