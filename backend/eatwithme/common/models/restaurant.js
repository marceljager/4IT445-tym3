'use strict';

module.exports = function(restaurant) {
	restaurant.status = function(cb) {
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
  restaurant.remoteMethod(
    'status', {
      http: {path: '/status', verb: 'get'},
			description: 'DummyMethod.',
      returns: {arg: 'status', type: 'string'}
    }
  );
 };
