'use strict';

app.controller('BrowseController', function($location, $http, $rootScope, $scope, $routeParams, toaster, Item, Items, getItems, Auth, User, Comment, Offer, OfferSvc) {
    $scope.searchItem = ''
    var user = User.getCurrentUser()
    $scope.uid = user.uid
    $scope.currentUser = user.name
    $scope.gravatar = user.gravatar
    $scope.signedIn = user.signedIn
    $scope.items = getItems.all;
    //$scope.items=Items.getAllItems();
    $scope.listMode = true;
    if ($routeParams.itemId) {
        $scope.listMode = false;
        Item.findItem({
                itemId: $routeParams.itemId
            }, function(item) {
                getItems.setSelectedItem(item)

                $scope.isItemPoster = (item.ITEM_POSTED_BY == $scope.uid)
                $scope.isSold = (item.ITEM_STATUS == 'sold')
                $http.get('/offer/' + item.ITEM_ID).success(function(offers) {
                    $scope.offers = offers
                    for (var i = 0; i < $scope.offers.length; i++) {
                        if ($scope.offers[i].USER_NAME == $scope.currentUser) {
                            $scope.alreadyOffered = true;
                            return;
                        }

                    } //--end for loop


                })

                Comment.findComments({
                        itemId: $routeParams.itemId
                    }, function(comments) {
                        $scope.comments = comments;
                        console.log('comments are -', $scope.comments)
                    }) //--end Comment.findComments

                $scope.selectedItem = item;

                $scope.isAvailable = (item.ITEM_STATUS == 'available')
                if (item.ITEM_POSTED_BY == $scope.uid) {
                    $scope.isItemPoster = true
                }


            }) //--- end Item.findItem
    } //------end routeParams.itemId

    $scope.makeOffer = function(offer) {
        $http.post('/newOffer', {
                p1: $scope.selectedItem.ITEM_ID,
                p2: $scope.uid,
                p3: offer.amount
            })
            .success(function(response) {
                $scope.offer = ''
                Offer.findOffers({
                    itemId: $scope.selectedItem.ITEM_ID
                }, function(offers) {
                    $scope.offers = offers;
                })
            })


    };

    $scope.addComment = function(comment) {
            $http.post('/newComment', {
                    p1: $scope.selectedItem.ITEM_ID,
                    p2: $scope.uid,
                    p3: comment
                })
                .success(function(status) {
                    if (status == 'OK') {

                        $scope.commentText = ''
                        Comment.findComments({
                            itemId: $scope.selectedItem.ITEM_ID
                        }, function(comment) {
                            $scope.comments = comment;
                        })

                        toaster.pop('success', "Comment created")
                            //$location.path('/browse')
                        $location.path('/browse/' + $scope.selectedItem.ITEM_ID)
                    } else {
                        toaster.pop('error', "Could not add comment")
                    }


                })

        }

    $scope.isItemPoster = function(username) {
        return (username == $scope.currentUser)
    }

    $scope.cancelItem = function(item) {
        item.ITEM_STATUS = 'cancelled'
        var url = '/item/' + item.ITEM_ID
        var payload = {
            p1: item.ITEM_TITLE,
            p2: item.ITEM_DESC,
            p3: item.ITEM_BOUGHT_BY,
            p4: item.ITEM_PRICE,
            p5: 'cancelled'
        }
        getItems.updateItemArray(item)
        getItems.editItem(url, payload).success(function(status) {

            toaster.pop('success', "Item is updated.");
            $location.path('/browse/' + item.ITEM_ID)
        })
    }



    function isAvailable(selectedItem) {
        return (selectedItem.ITEM_STATUS == 'available')
    }



    $scope.acceptOffer = function(offer) {
        var offerUrl = '/offer/' + offer.OFFER_ID
        var offerPayload = {
            p1: 'accepted'
        }
        var selectedItem = $scope.selectedItem
        OfferSvc.updateOffer(offerUrl, offerPayload).success(function(status) {

            var itemUrl = '/item/' + selectedItem.ITEM_ID
            var itemPayload = {
                p1: selectedItem.ITEM_TITLE,
                p2: selectedItem.ITEM_DESC,
                p3: selectedItem.ITEM_BOUGHT_BY,
                p4: selectedItem.ITEM_PRICE,
                p5: 'sold'
            }
            selectedItem.ITEM_STATUS = 'sold'
            getItems.updateItemArray(selectedItem)
            getItems.editItem(itemUrl, itemPayload).success(function(status) {
                $scope.isAvailable = false;
                toaster.pop('success', "Offer accepted!");
                $location.path('/browse/' + selectedItem.ITEM_ID)
            })
        })
    }; //---end acceptOffer



    function alreadyOffered(selectedItem) {
        for (var i = 0; i < $scope.offers.length; i++) {
            if ($scope.offers.USER_NAME = $scope.currentUser) {
                return true
            }
        }
    }

});
