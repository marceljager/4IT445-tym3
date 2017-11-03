'use strict';

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    'Událost',
    {
      title: { type: DataTypes.STRING, allowNull: false },
      place: { type: DataTypes.STRING, allowNull: false},
      rating: { type: DataTypes.INTEGER, allowNull: false },
      numberOfRatings: { type: DataTypes.INTEGER, allowNull: false},
      datefrom: { type: DataTypes.DATETIME, allowNull: false},
      dateto: { type: DataTypes.DATETIME, allowNull: false},
      dateText: { type: DataTypes.STRING, allowNull: false},
      participants: { type: DataTypes.INTEGER, allowNull: false},
      private: { type: DataTypes.BOOLEAN, allowNull: false},
      image: { type: DataTypes.MEDIUMTEXT, allowNull: false},
    },
    {}
  );

  return Event;
};
