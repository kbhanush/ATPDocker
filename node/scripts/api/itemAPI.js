/**
 * Created by kbhanush on 5/12/15.
 */

var oracledb = require('oracledb');
var dbConfig = require('../dbconfig.js');

/* API for creating new item, finding item by id and all items */

module.exports = function(app) {

        /*-------------------------------------------New item ----------------------------*/

        app.post('/item', function(req, res, next) {


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
                        'INSERT INTO items (item_title,item_desc,item_posted_by,item_status,item_price) ' +
                        'values (:p1,:p2,:p3,:p4,:p5) ',

                        {
                            p1: req.body.p1,
                            p2: req.body.p2,
                            p3: req.body.p3,
                            p4: req.body.p4,
                            p5: req.body.p5
                        },

                        {
                            autoCommit: true
                        },

                        function(err, status) {
                            if (err) {
                                console.error(err.message);
                                doRelease(connection);
                                return;
                            } else if (status.rowsAffected) {

                                connection.execute(
                                    'select ITEMS.item_ID, ITEMS.item_TITLE, ITEMS.item_DESC,ITEMS.item_POST_DATE, ' +
                                    'ITEMS.item_posted_by,ITEMS.item_bought_by,USERS.USER_GRAVATAR,ITEMS.item_PRICE, ' +
                                    'ITEMS.item_STATUS from ITEMS, USERS where ITEMS.item_posted_by = USERS.USER_ID ' +
                                    'and items.item_title = :t1 and items.item_posted_by = :t2',

                                    {
                                        t1: req.body.p1,
                                        t2: req.body.p3
                                    },

                                    {
                                        outFormat: oracledb.OBJECT
                                    },

                                    function(err, result) {

                                        if (err) {
                                            console.log(err.message);
                                            doRelease(connection);
                                            return
                                        }

                                        doRelease(connection)
                                        res.json(result.rows[0])
                                    }); //----- end connection.execute(select)
                            }
                        }); //------end conn.execute(insert)        

                }); //------end oracledb.getConnection

        }); //-----end app.post new item  






        //--------------start getAll items ---------------------
        app.get('/item', function(req, res, next) {

            /*save new item in mongo */

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

                        'select ITEMS.item_ID, ITEMS.item_TITLE, ITEMS.item_DESC,ITEMS.item_POST_DATE, ' +
                        'ITEMS.item_posted_by,ITEMS.item_bought_by,USERS.USER_GRAVATAR,ITEMS.item_bought_by,ITEMS.item_PRICE, ' +
                        'ITEMS.item_STATUS from ITEMS, USERS where ITEMS.item_posted_by = USERS.USER_ID',

                        {}, {
                            outFormat: oracledb.OBJECT
                        },

                        function(err, items) {
                            if (err) {
                                console.error(err.message);
                                doRelease(connection);
                                return;
                            }
                            doRelease(connection);
                            res.json(items.rows);

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

        }); //-----------------------end getAllitems

        //------------------------Start getitemById-----------------------

        app.get('/item/:itemId', function(req, res, next) {
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

                        'select ITEMS.item_ID, ITEMS.item_TITLE, ITEMS.item_DESC,ITEMS.item_POST_DATE, ' +
                        'ITEMS.item_posted_by,ITEMS.item_bought_by, USERS.USER_NAME, USERS.USER_GRAVATAR,ITEMS.item_PRICE, ' +
                        'ITEMS.item_STATUS from ITEMS, USERS where ITEMS.item_posted_by = USERS.USER_ID and ' +
                        'item_id =:id', {
                            id: req.params.itemId
                        }, {
                            outFormat: oracledb.OBJECT
                        },

                        function(err, item) {
                            if (err) {
                                console.error(err.message);
                                doRelease(connection);
                                return;
                            }
                            doRelease(connection);
                            res.json(item.rows[0]);

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

        }); //---------------end getitem -------------------------

        //----------Find items for uid

        app.get('/item/:uid', function(req, res, next) {
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

                        'select ITEMS.item_ID, ITEMS.item_TITLE, ITEMS.item_DESC,ITEMS.item_POST_DATE, ' +
                        'ITEMS.item_posted_by,ITEMS.item_bought_by, USERS.USER_NAME, USERS.USER_GRAVATAR,ITEMS.item_PRICE, ' +
                        'ITEMS.item_STATUS from ITEMS, USERS where ITEMS.item_posted_by = USERS.USER_ID and ' +
                        'item_id =:id', {
                            id: req.params.itemId
                        }, {
                            outFormat: oracledb.OBJECT
                        },

                        function(err, item) {
                            if (err) {
                                console.error(err.message);
                                doRelease(connection);
                                return;
                            }
                            doRelease(connection);
                            res.json(item.rows[0]);

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

        }); //---------------end getitem -------------------------




        //---------------start update item ---------------------

        app.put('/item/:itemId', function(req, res, next) {
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
                        'UPDATE items SET item_title = :p1, item_desc = :p2, item_bought_by = :p3, item_price = :p4,' +
                        ' item_status = :p5 WHERE item_id = :p6',

                        {
                            p1: req.body.p1,
                            p2: req.body.p2,
                            p3: req.body.p3,
                            p4: req.body.p4,
                            p5: req.body.p5,
                            p6: req.params.itemId
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

    } //this is the final closing bracket for module.exports
