'use strict';

var crypto = require('crypto');
var app = require('../../server/server');
const formidable = require('formidable');

const BUCKET = 'avatars';

module.exports = function(customer) {


  // customer.beforeRemote('**', function (ctx, unused, next) {
  //       var asset = customer.app.models.Asset;
        // asset.findOne({id:ctx.req.picture})
        //     .then(function(result) {
        //       ctx.result.picture = result.filename;
        //       console.log(result.filename);
        // });

        // const Asset = customer.app.models.Asset;
        // const Container = customer.app.models.Container;
        // console.log(ctx);
        // const filePromise = new Promise((resolve, reject) => {
        // Asset.upload(ctx.req, ctx.res, {}, (error, fileObj) => {
        //       console.log(error);
        //     console.log(fileObj);
        //     resolve(fileObj);
        //   });
        // });
        // const filePromise = new Promise((resolve, reject) => {
        //   Container.upload(ctx.req, ctx.res, {
        //     container: BUCKET,
        //   }, (error, fileObj) => {
        //     if (error) {
        //       return reject(error);
        //     }

            // fileObj.files.file[0].name = crypto.createHash('md5').update(fileObj.files.file[0].name + new Date().toISOString()).digest('hex');
        //     const fileInfo = fileObj.files.file[0];
        //       console.log(fileInfo);
        //     resolve(fileInfo);
        //   });
        // });
        // next();
    // });


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
