'use strict';

var app = require('../../server/server');

module.exports = function(customer) {
/*
  customer.afterRemote('login', function (ctx, unused, next) {
        var cust = customer.findOne {where: {id: 1}} ;
        ctx.result.userName  = cust.name;
        ctx.result.picture = new Date();
        next();
    });
*/

  customer.feed = function(custId, cb) {
   var ds = customer.dataSource;
   var sql = "SELECT * FROM Event WHERE private = false UNION SELECT Event.* FROM invitations INNER JOIN Event ON invitations.eventID = Event.id WHERE Event.private = true AND invitations.customerID = ? UNION SELECT Event.* FROM attendance INNER JOIN Event ON attendance.eventID = Event.id WHERE Event.private = true AND attendance.customerID = ? ORDER BY dateFrom";
   ds.connector.query(sql, [custId, custId], function (err, events) {
   if (err) console.error(err);
  cb(err, events);
   });
  };
  customer.remoteMethod(
  'feed', {
        http: {path: '/feed', verb: 'get'},
        description: 'Return public events + events this user is invited to',
        accepts: {arg: 'custId', type: 'string'},
        returns: {arg: 'data', type: '[]'}
      }
    );

  customer.acceptFriendRequest = function(reqId, cb) {
   var ds = customer.dataSource;
   var sql = "UPDATE friendship SET notificationType = 'accepted', status = 'Mutual' WHERE id = ?";
   ds.connector.query(sql, [reqId],function (err, customer) {
   if (err) console.error(err);
  cb(err, customer);
   });
  };

  customer.remoteMethod(
  'acceptFriendRequest', {
        http: {path: '/accept', verb: 'post'},
        description: 'Sets friendship status to "Mutual".',
        accepts: {arg: 'reqId', type: 'number'},
        returns: {arg: 'data', type: 'string'}
      }
    );

/*
SET FRIENDS SINCE TO new Date(); 

    customer.afterRemote('acceptFriendRequest', function (ctx, unused, next) {
        ctx.result.data[0].friendsSince = new Date();
        next();
    });
*/

    customer.getFriends = function(custId, cb) {
     var ds = customer.dataSource;
     var sql = "SELECT friendship.id AS relationID, friendship.friendsSince, friendship.status, customer.id, customer.username, customer.picture FROM friendship INNER JOIN customer ON customer.ID = friendship.customer1ID WHERE friendship.customer2ID = ? AND friendship.status = 'Mutual' UNION SELECT friendship.id AS relationID, friendship.friendsSince, friendship.status, customer.id , customer.username, customer.picture FROM friendship INNER JOIN customer ON customer.ID = friendship.customer2ID WHERE friendship.customer1ID = ? AND friendship.status = 'Mutual';"
     ds.connector.query(sql, [custId, custId],function (err, customer) {
     if (err) console.error(err);
    cb(err, customer);
     });
    };
    customer.remoteMethod(
    'getFriends', {
          http: {path: '/getFriends', verb: 'get'},
          description: 'Get friends for a specific user.',
          accepts: {arg: 'custId', type: 'number'},
          returns: {arg: 'data', type: 'string'}
        }
      );

    customer.getRequestsMine = function(custId, cb) {
     var ds = customer.dataSource;
     var sql = "SELECT friendship.id AS relationID, friendship.friendsSince, friendship.status, customer.id, customer.username , customer.picture FROM friendship INNER JOIN customer ON customer.ID = friendship.customer1ID WHERE friendship.customer2ID = ? AND friendship.status = 'Request'"
    
     ds.connector.query(sql, [custId],function (err, customer) {
     if (err) console.error(err);
    cb(err, customer);
     });
    };
    customer.remoteMethod(
    'getRequestsMine', {
          http: {path: '/getReqsMine', verb: 'get'},
          description: 'Get requests to accept for a specific user.',
          accepts: {arg: 'custId', type: 'number'},
          returns: {arg: 'data', type: 'string'}
        }
      );

    customer.getRequestsSent = function(custId, cb) {
     var ds = customer.dataSource;
     var sql = "SELECT friendship.id AS relationID, friendship.friendsSince, friendship.status, customer.id, customer.username, customer.picture FROM friendship INNER JOIN customer ON customer.ID = friendship.customer2ID WHERE friendship.customer1ID = ? AND friendship.status = 'Request'"   
     ds.connector.query(sql, [custId],function (err, customer) {
     if (err) console.error(err);
    cb(err, customer);
     });
    };
    customer.remoteMethod(
    'getRequestsSent', {
          http: {path: '/getReqsSent', verb: 'get'},
          description: 'Get requests sent from a specific user.',
          accepts: {arg: 'custId', type: 'number'},
          returns: {arg: 'data', type: 'string'}
        }
      );

};
