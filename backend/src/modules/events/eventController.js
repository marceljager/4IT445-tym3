/*
import eventList from './eventList';

export const eventController = async (req, res) => {
  res.json(eventList);
};

export const eventDetailController = async (req, res) => {
  const { params, query } = req;
  const { events } = eventList;
  const filteredEvents = events.filter(
    event => event[params.id] == query.q
  );

  const data = {
    contacts: filteredEvents,
    params,
    query,
    time: new Date(),
  };

  res.json(data);
};
*/

import db from '../../models/';

export const eventController = async (req, res) => {
  const events = await db.Event.findAll({
  });

  res.json({ events });
};

export const eventDetailController = async (req, res) => {
  const { params } = req;
  const event = await db.Event.findById(params.id, {
  });

  if (!event) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.json({ event });
};
