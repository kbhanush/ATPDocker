var oracledb = require('oracledb');
var dbConfig = require('../dbconfig.js');

/* API for creating new item, finding item by id and all items */

module.exports = function(app) {

        app.get('/comment/:itemId', function(req, res, next) {

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
                        'SELECT USERS.USER_NAME, USERS.USER_GRAVATAR, COMMENTS.COMMENT_ID, COMMENTS.COMMENT_BY, COMMENTS.COMMENT_TEXT, ' +
                        'COMMENTS.COMMENT_CREATE_DATE from USERS, COMMENTS where COMMENTS.COMMENT_BY = USERS.user_id and COMMENTS.item_id =:id',

                        {
                            id: req.params.itemId
                        }, {
                            outFormat: oracledb.OBJECT
                        },
                        function(err, comments) {
                            if (err) {
                                console.error(err.message);
                                doRelease(connection);
                                return;
                            }
                            //console.log(comments.metaData);
                            console.log(comments.rows);
                            doRelease(connection);
                            res.json(comments.rows);

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


        }); //-------end getComments ------------------



        app.post('/newComment', function(req, res, next) {


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
                        'INSERT INTO comments (item_id,comment_by,comment_text) VALUES (:p1, :p2, :p3)',


                        {
                            p1: req.body.p1,
                            p2: req.body.p2,
                            p3: req.body.p3
                        },

                        {
                            autoCommit: true
                        },

                        function(err, status) {
                            if (err) {
                                console.error(err.message);
                                doRelease(connection);
                                return;
                            }
                            doRelease(connection);
                            res.sendStatus(200);

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



        }); //-------end getComments ------------------



    } //---------------- final closing bracket for module- ------------
