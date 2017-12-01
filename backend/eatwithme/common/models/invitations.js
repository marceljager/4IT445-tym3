'use strict';

var app = require('../../server/server');

module.exports = function(invitations) {

  invitations.acceptInvitation = function(invId, cb) {
   var ds = invitations.dataSource;
   var sql = "SELECT * from invitations WHERE id = ?";
   ds.connector.query(sql, [invId],function (err, invitations) {
   if (err) console.error(err);
  cb(err, invitations);
   });
  };

  invitations.afterRemote ('acceptInvitation', function (ctx, unused, next) {
    var e = ctx.result.data[0].eventID;
    var c = ctx.result.data[0].customerID;
    var ds = invitations.dataSource;
    var sql = "INSERT INTO attendance (eventID, customerID) VALUES (?, ?)";
    ds.connector.query(sql, [e, c],function (err, invitations) {
    if (err) console.error(err);
    next();
  });
});

  invitations.afterRemote ('acceptInvitation', function (ctx, unused, next) {
    var i = ctx.result.data[0].id;
    var ds = invitations.dataSource;
    var sql = "DELETE FROM invitations WHERE id = ?";
    ds.connector.query(sql, [i],function (err, invitations) {
    if (err) console.error(err);
    next();
  });
});

  invitations.remoteMethod(
  'acceptInvitation', {
        http: {path: '/accept', verb: 'post'},
        description: 'Creates new attendance and removes this invitation.',
        accepts: {arg: 'invId', type: 'number'},
        returns: {arg: 'data', type: 'string'}
      }
    );

    invitations.getInfo = function(invId, cb) {
     var ds = invitations.dataSource;
     var invInst = invitations[invId];
     var sql = "SELECT invitations.*, customer.username AS fromName, customer.picture AS fromPic FROM invitations INNER JOIN customer ON customer.ID = invitations.from WHERE invitations.id = ?";
     ds.connector.query(sql, [invId],function (err, invitations) {
     if (err) console.error(err);
    cb(err, invitations);
     });
    };
    invitations.remoteMethod(
    'getInfo', {
          http: {path: '/getInfo', verb: 'get'},
          description: 'Creates new attendance and removes this invitation.',
          accepts: {arg: 'invId', type: 'number'},
          returns: {arg: 'data', type: 'string'}
        }
      );

};
