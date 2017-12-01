'use strict';

module.exports = function(event) {
	event.status = function(cb) {
	var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var OPEN_HOUR = 6;
    var CLOSE_HOUR = 20;
    console.log('Current hour is %d', currentHour);
    var response;
    if (currentHour >= OPEN_HOUR && currentHour < CLOSE_HOUR) {
      response = 'Ted muzes na akci.';
    } else {
      response = 'Akce se ted nekona.';
    }
    cb(null, response);
		};
  event.remoteMethod(
    'status', {
      http: {path: '/status', verb: 'get'},
			description: 'DummyMethod.',
      returns: {arg: 'status', type: 'string'}
    }
  );

	event.search = function(q,cb) {
		var ds = event.dataSource;
		var sql = "SELECT 'Event' AS resultType, id, name, picture FROM Event WHERE LOWER(name) REGEXP LOWER(?) UNION SELECT 'User' AS resultType, id, username AS name, picture FROM customer WHERE LOWER(username) REGEXP LOWER(?)  UNION SELECT 'Restaurant' AS resultType, id, name, picture FROM restaurant WHERE LOWER(name) REGEXP LOWER(?) ";
    ds.connector.query(sql, [q, q, q], function (err, events) {
		if (err) console.error(err);
	 cb(err, events);
 	});
 };
 event.remoteMethod(
	 'search', {
				 http: {path: '/search', verb: 'get'},
				 description: 'Return search results on events + customers',
				 accepts: {arg: 'q', type: 'string'},
				 returns: {arg: 'data', type: '[]'}
			 }
		 );

		 event.publicFeed = function(cb) {
	 		var ds = event.dataSource;
	 		var sql = "SELECT * FROM Event WHERE private = false ORDER BY dateFrom";
	 		ds.connector.query(sql, function (err, events) {
	 		if (err) console.error(err);
	 	 cb(err, events);
	  	});
	  };
	  event.remoteMethod(
	 	 'publicFeed', {
	 				 http: {path: '/publicFeed', verb: 'get'},
	 				 description: 'Return public events.',
	 				 returns: {arg: 'data', type: '[]'}
	 			 }
	 		 );
 };
