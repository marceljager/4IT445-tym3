module.exports = function(app) {

  app.dataSources.DBsource.automigrate('restaurant', function(err) {
    if (err) throw err;

    app.models.restaurant.create([{
      "name": "Hospoda 1",
      "adress": "Ulice 123, Praha 7",
      "rating": 0,
      "numberOfRatings": 0,
      "website": "seznam.cz",
      "openHours": "11-23",
      "description": "hnusna",
      "picture": "string",
      "GPS": "string",
      "id": "1"
    }, {
       "name": "Hospoda 2",
      "adress": "U Smaltovny 8, Praha 1",
      "rating": 0,
      "numberOfRatings": 0,
      "website": "seznam.cz",
      "openHours": "11-23",
      "description": "hezka",
      "picture": "string",
      "GPS": "string",
      "id": "2"
    },

], function(err, restaurant) {
      if (err) throw err;

      console.log('Models created: \n', restaurant);
    });
  });

    app.dataSources.DBsource.automigrate('friendship', function(err) {
    if (err) throw err;

    app.models.friendship.create([{
    "customer1ID": 1,
    "customer2ID": 2,
    "notificationType": "accepted",
    "status": "Mutual"
    }, {
    "customer1ID": 1,
    "customer2ID": 3,
    "notificationType": "friendRequest",
    "status": "Request"
  },
], function(err, friendship) {
      if (err) throw err;

      console.log('Models created: \n', friendship);
    });
  });
};
