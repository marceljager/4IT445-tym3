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
   var sql = "SELECT * FROM Event WHERE private = false UNION SELECT Event.* FROM invitations INNER JOIN Event ON invitations.eventID = Event.id WHERE Event.private = true AND invitations.customerID = ?";
   ds.connector.query(sql, [custId], function (err, events) {
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

};
