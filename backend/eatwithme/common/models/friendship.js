'use strict';

var app = require('../../server/server');

module.exports = function(friendships) {

  friendships.acceptRequest = function(reqId, cb) {
   var ds = friendships.dataSource;
   var sql = "INSERT INTO friendship (status, notificationType) VALUES ('Mutual', 'Accepted') WHERE id = ?";
   ds.connector.query(sql, [reqId],function (err, friendships) {
   if (err) console.error(err);
  cb(err, friendships);
   });
  };

  friendships.remoteMethod(
  'acceptRequest', {
        http: {path: '/accept', verb: 'post'},
        description: 'Sets friendship status to "Mutual".',
        accepts: {arg: 'reqId', type: 'number'},
        returns: {arg: 'data', type: 'string'}
      }
    );

    friendships.getFriends = function(custId, cb) {
     var ds = friendships.dataSource;
     var sql = "SELECT friendship.*, customer.id AS friendID, customer.username AS friendName, customer.picture AS friendPic FROM friendship INNER JOIN customer ON customer.ID = friendship.customer1ID WHERE friendship.customer2ID = ? AND friendship.status = 'Mutual' UNION SELECT friendship.*, customer.id AS friendID, customer.username AS friendName, customer.picture AS friendPic FROM friendship INNER JOIN customer ON customer.ID = friendship.customer2ID WHERE friendship.customer1ID = ? AND friendship.status = 'Mutual';"
     ds.connector.query(sql, [custId, custId],function (err, friendships) {
     if (err) console.error(err);
    cb(err, friendships);
     });
    };
    friendships.remoteMethod(
    'getFriends', {
          http: {path: '/getFriends', verb: 'get'},
          description: 'Get friends for a specific user.',
          accepts: {arg: 'custId', type: 'number'},
          returns: {arg: 'data', type: 'string'}
        }
      );

    friendships.getRequestsMine = function(custId, cb) {
     var ds = friendships.dataSource;
     var sql = "SELECT friendship.id, friendship.friendsSince, friendship.notificationType, friendship.status, customer.id AS friendID, customer.username AS friendName, customer.picture AS friendPic FROM friendship INNER JOIN customer ON customer.ID = friendship.customer1ID WHERE friendship.customer2ID = ? "
    
     ds.connector.query(sql, [custId],function (err, friendships) {
     if (err) console.error(err);
    cb(err, friendships);
     });
    };
    friendships.remoteMethod(
    'getRequestsMine', {
          http: {path: '/getReqsMine', verb: 'get'},
          description: 'Get requests to accept for a specific user.',
          accepts: {arg: 'custId', type: 'number'},
          returns: {arg: 'data', type: 'string'}
        }
      );

    friendships.getRequestsSent = function(custId, cb) {
     var ds = friendships.dataSource;
     var sql = "SELECT friendship.id, friendship.friendsSince, friendship.notificationType, friendship.status, customer.id AS friendID, customer.username AS friendName, customer.picture AS friendPic FROM friendship INNER JOIN customer ON customer.ID = friendship.customer2ID WHERE friendship.customer1ID = ? "   
     ds.connector.query(sql, [custId],function (err, friendships) {
     if (err) console.error(err);
    cb(err, friendships);
     });
    };
    friendships.remoteMethod(
    'getRequestsSent', {
          http: {path: '/getReqsSent', verb: 'get'},
          description: 'Get requests sent from a specific user.',
          accepts: {arg: 'custId', type: 'number'},
          returns: {arg: 'data', type: 'string'}
        }
      );

};
