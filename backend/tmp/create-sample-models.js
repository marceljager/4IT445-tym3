module.exports = function(app) {
  app.dataSources.DBsource.automigrate('customer', function(err) {
    if (err) throw err;

    app.models.customer.create([{
  "picture": "string",
  "realm": "user",
  "username": "zbynek",
  "password": "123",
  "email": "zbynek@gmail.com",
  "emailVerified": true,
  "id": 0
}, {
  "picture": "string",
  "realm": "user",
  "username": "mirek",
  "password": "123",
  "email": "miro@gmail.com",
  "emailVerified": true,
  "id": 0
}, {
  "picture": "string",
  "realm": "user",
  "username": "roman",
  "password": "123",
  "email": "roman@gmail.com",
  "emailVerified": true,
  "id": 0
},{
 "picture": "string",
  "realm": "user",
  "username": "marcel",
  "password": "123",
  "email": "marcel@gmail.com",
  "emailVerified": true,
  "id": 0
},{
 "picture": "string",
  "realm": "user",
  "username": "filip",
  "password": "123",
  "email": "filip@gmail.com",
  "emailVerified": true,
  "id": 0
}

], function(err, customers) {
      if (err) throw err;

      console.log('Models created: \n', customers);
    });
  });

  app.dataSources.DBsource.automigrate('attendance', function(err) {
    if (err) throw err;

    app.models.attendance.create([{
    "eventID": 1,
    "customerID": 1
  }, {
  "eventID": 2,
  "customerID": 1
  }, {
  "eventID": 1,
  "customerID": 2
},
], function(err, attendance) {
      if (err) throw err;

      console.log('Models created: \n', attendance);
    });
  });

  app.dataSources.DBsource.automigrate('invitations', function(err) {
    if (err) throw err;

    app.models.invitations.create([{
    "eventID": 3,
    "customerID": 1
  }, {
  "eventID": 2,
  "customerID": 3
  }, {
  "eventID": 1,
  "customerID": 3
},
], function(err, invitations) {
      if (err) throw err;

      console.log('Models created: \n', invitations);
    });
  });
  
  app.dataSources.DBsource.automigrate('Event', function(err) {
    if (err) throw err;

    app.models.Event.create([{
  "name": "schuzka",
  "place": "misto",
  "rating": 0,
  "numberOfRatings": 0,
  "dateFrom": "October 13, 2014 11:13:00",
  "dateTo": "October 13, 2014 11:15:00",
  "dateText": "prijd",
  "participants": 0,
  "private": true,
  "id": 0
}, {
  "name": "schuzka2",
  "place": "misto2",
  "rating": 0,
  "numberOfRatings": 0,
  "dateFrom": "October 13, 2014 11:13:00",
  "dateTo": "October 13, 2014 11:15:00",
  "dateText": "prijd",
  "participants": 0,
  "private": false,
  "id": 0
}, {
  "name": "schuzka3",
  "place": "misto3",
  "rating": 0,
  "numberOfRatings": 0,
  "dateFrom": "October 13, 2014 11:13:00",
  "dateTo": "October 13, 2014 11:15:00",
  "dateText": "prijd",
  "participants": 0,
  "private": false,
  "id": 0
},
], function(err, events) {
      if (err) throw err;

      console.log('Models created: \n', events);
    });
  });
};
