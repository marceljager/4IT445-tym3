import React from 'react';
import propTypes from 'prop-types';

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

RecomendedEvents.propTypes = {
    events: propTypes.arrayOf(
        propTypes.shape({})
    )
};

RecomendedEvents.defaultProps = {
    events: []
};

export default RecomendedEvents;
