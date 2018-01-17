import React from 'react';
import propTypes from 'prop-types';

import EventItem from './EventItem';
const today = new Date();
today.setHours(0, 0, 0, 0);

const EventsFeed = (props) => {
    let feed = [];
    if (props.events) {
        if (props.today) {
            feed = props.events.map((event, index) => {
                const varDate = new Date(event.dateFrom);
                varDate.setHours(0, 0, 0, 0);

                if (varDate > today || varDate < today) {
                    return null;
                } else {
                    return (
                        <EventItem key={index.toString()} eventInfo={event} date={props.date} />
                    );
                }
            });
        } else if (props.newer) {
            feed = props.events.map((event, index) => {
                const varDate = new Date(event.dateFrom);
                varDate.setHours(0, 0, 0, 0);

                if (varDate > today) {
                    return (
                        <EventItem key={index.toString()} eventInfo={event} />
                    );
                }
                return null;
            });
        } else {
            feed = props.events.map((event, index) => (
                <EventItem key={index.toString()} eventInfo={event} />
            ));
        }
    }

    return (
        <div className="d-flex flex-wrap justify-content-between">
            {feed}
        </div>
    );
};

EventsFeed.propTypes = {
    events: propTypes.arrayOf(
        propTypes.shape({}),
    ),
    date: propTypes.number
};

EventsFeed.defaultProps = {
    events: [],
    date: null
};

export default EventsFeed;
