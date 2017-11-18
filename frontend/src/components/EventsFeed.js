import React from 'react';

import EventItem from './EventItem';

const RecomendedEvents = (props) => {
    let feed = [];
    if (props.events) {
        feed = props.events.map((event, index) => (
            <EventItem key={index.toString()} eventInfo={event} />
        ));
    }

    return (
        <div className="d-flex flex-wrap justify-content-between">
            {feed}
        </div>
    );
};

export default RecomendedEvents;
