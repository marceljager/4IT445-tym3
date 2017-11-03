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
