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

                if (varDate === today) {
                    return (
                        <EventItem key={index.toString()} eventInfo={event} date={props.date}/>
                    );
                }
                return null;
            });
        } else if (props.newer) {
            feed = props.events.map((event, index) => {
                const varDate = new Date(event.dateFrom);

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
