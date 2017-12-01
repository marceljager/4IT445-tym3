'use strict';

var crypto = require('crypto');
var app = require('../../server/server');
const formidable = require('formidable');

const BUCKET = 'avatars';

module.exports = function(customer) {


  customer.afterRemote('**', function (ctx, unused, next) {
        var asset = customer.app.models.Asset;
        asset.findOne({id:ctx.req.picture})
            .then(function(result) {
              ctx.result.picture = result.filename;
        });
        var hash = crypto.createHash('md5').update("img").digest('hex');
        console.log(hash);
        // console.log(ctx.req);
        next();
        // var cust = customer.findOne {where: {id: 1}} ;
        // ctx.result.userName  = cust.name;
        // ctx.result.picture = new Date();
        // next();
    });


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
