import React from 'react';
import propTypes from 'prop-types';

import EventItem from './EventItem';

const EventsFeed = (props) => {
    let feed = [];
    if (props.events) {
        feed = props.events.map((event, index) => (
            <EventItem key={index.toString()} eventInfo={event} date={props.date} />
        ));
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
