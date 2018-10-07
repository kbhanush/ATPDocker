/**
 * Created by kbhanush on 5/12/15.
 */

var oracledb = require('oracledb');
var dbConfig = require('../dbconfig.js');

/* API for creating new item, finding item by id and all items */

module.exports = function(app) {




        //------------------------Start get all offers by itemid-----------------------

        app.get('/offer/:itemId', function(req, res, next) {
            var id = req.params.itemId;
            oracledb.getConnection({
                    user: dbConfig.user,
                    password: dbConfig.password,
                    connectString: dbConfig.connectString
                },
                function(err, connection) {
                    if (err) {
                        console.error(err.message);
                        return;
                    }
                    connection.execute(

                        'SELECT OFFERS.OFFER_ID,USERS.USER_NAME, USERS.USER_GRAVATAR, OFFERS.OFFER_AMOUNT ' +
                        'from USERS, OFFERS where OFFERS.OFFER_BY = USERS.user_id and item_id =:id',

                        {
                            id: req.params.itemId
                        }, {
                            outFormat: oracledb.OBJECT
                        },

                        function(err, offers) {
                            if (err) {
                                console.error(err.message);
                                doRelease(connection);
                                return;
                            }
                            doRelease(connection);
                            res.json(offers.rows);

                        });
                });

            function doRelease(connection) {
                connection.release(
                    function(err) {
                        if (err) {
                            console.error(err.message);
                        }
                    });
            }

        }); //---------------end get all offers by itemid -------------------------

        //---------------start update item ---------------------

        app.put('/offer/:offerId', function(req, res, next) {
            oracledb.getConnection({
                    user: dbConfig.user,
                    password: dbConfig.password,
                    connectString: dbConfig.connectString
                },
                function(err, connection) {
                    if (err) {
                        console.error(err.message);
                        return;
                    }


                    connection.execute(
                        'UPDATE offers SET offer_status = :p1 where offer_id = :p2',

                        {
                            p1: req.body.p1,
                            p2: req.params.offerId
                        }, {
                            autoCommit: true
                        },


                        function(err, status) {
                            if (err) {
                                console.error(err.message);
                                doRelease(connection);
                                return;
                            }
                            doRelease(connection);
                            res.json(status);

                        });
                })
        }); //-------------end app.put update item --------------------

        //--------start delete items ----------------------

        app.delete('/item/:itemId', function(req, res, next) {
            oracledb.getConnection({
                    user: dbConfig.user,
                    password: dbConfig.password,
                    connectString: dbConfig.connectString
                },
                function(err, connection) {
                    if (err) {
                        console.error(err.message);
                        return;
                    }


                    connection.execute(
                        'DELETE from items WHERE item_id = :p1',

                        {
                            p1: req.params.itemId
                        }, {
                            autoCommit: true
                        },


                        function(err, status) {
                            if (err) {
                                console.error(err.message);
                                doRelease(connection);
                                return;
                            }
                            doRelease(connection);
                            res.json(status);

                        });
                })
        }); //-------end app.delete-------



        function doRelease(connection) {
            connection.release(
                function(err) {
                    if (err) {
                        console.error(err.message);
                    }
                });
        }
        app.post('/newOffer', function(req, res, next) {


            oracledb.getConnection({
                    user: dbConfig.user,
                    password: dbConfig.password,
                    connectString: dbConfig.connectString
                },
                function(err, connection) {
                    if (err) {
                        console.error(err.message);
                        return;
                    }

                    connection.execute(
                        'INSERT INTO offers (item_id, offer_by,offer_amount) VALUES (:p1, :p2, :p3) ' +
                        'RETURNING ITEM_ID, OFFER_ID, OFFER_BY, OFFER_AMOUNT, OFFER_STATUS, TO_CHAR(OFFER_CREATE_DATE) ' +
                        'INTO :ITEM_ID, :OFFER_ID,:offer_by, :OFFER_AMOUNT, :OFFER_STATUS, :OFFER_CREATE_DATE',

                        // OFFER_ID, OFFER_BY, OFFER_CREATE_DATE, OFFER_AMOUNT, OFFER_STATUS INTO ' +
                        // ':ITEM_ID, :OFFER_ID, :OFFER_BY, :OFFER_CREATE_DATE, :OFFER_AMOUNT, :OFFER_STATUS',

                        {
                            p1: req.body.p1,
                            p2: req.body.p2,
                            p3: req.body.p3,
                            ITEM_ID: {
                                type: oracledb.NUMBER,
                                dir: oracledb.BIND_OUT
                            },
                            OFFER_ID: {
                                type: oracledb.NUMBER,
                                dir: oracledb.BIND_OUT
                            },
                            OFFER_BY: {
                                type: oracledb.NUMBER,
                                dir: oracledb.BIND_OUT
                            },
                            OFFER_CREATE_DATE: {
                                type: oracledb.STRING,
                                dir: oracledb.BIND_OUT
                            },
                            OFFER_AMOUNT: {
                                type: oracledb.NUMBER,
                                dir: oracledb.BIND_OUT
                            },
                            OFFER_STATUS: {
                                type: oracledb.STRING,
                                dir: oracledb.BIND_OUT
                            }
                        },

                        {
                            autoCommit: true
                        },
                        //{outFormat: oracledb.OBJECT},

                        function(err, result) {
                            if (err) {
                                console.error(err.message);
                                doRelease(connection);
                                return;
                            }
                            doRelease(connection);
                            res.json(result.outBinds);
                            console.log('offer submitted:',result.outBinds)

                        });
                });

            function doRelease(connection) {
                connection.release(
                    function(err) {
                        if (err) {
                            console.error(err.message);
                        }
                    });
            }



        }); //-------end newOffer ------------------



    } //this is the final closing bracket for module.exports
