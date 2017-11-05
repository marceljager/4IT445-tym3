import React from 'react';
import { Link } from 'react-router-dom';

import Rating from './Rating';

const EventItem = (props) => {
    const { itemType, eventInfo } = props;

    const itemStyle = {
        backgroundImage: `url(../upload/eventImages/${eventInfo.image})`
    };

    if (itemType === 'compact') {
        return (
            <Link to="/detail-akce" className="EventItem EventItem--compact">
                <span className="EventItem-image" style={itemStyle}>
                    <span className="EventItem-badge">
                        {eventInfo.private
                            ? 'Soukromá'
                            : 'Veřejná'
                        }
                    </span>
                </span>
                <span className="EventItem-textSide">
                    <span className="EventItem-title">{eventInfo.title}</span>
                    <span className="EventItem-place">
                        {eventInfo.place}
                        <span className="EventItem-rating">
                            <Rating rating={eventInfo.rating} />
                        </span>
                    </span>
                    <span className="EventItem-date">{eventInfo.time}, {eventInfo.date}</span>
                </span>
            </Link>
        );
    }

    return (
        <Link to="/detail-akce" className="EventItem">
            <span className="EventItem-image" style={itemStyle}>
                <span className="EventItem-badge">
                    {eventInfo.private
                        ? 'Soukromá'
                        : 'Veřejná'
                    }
                </span>
            </span>
            <span className="EventItem-textSide">
                <span className="EventItem-title">{eventInfo.title}</span>
                <span className="EventItem-place">
                    {eventInfo.place}
                </span>
                <span className="EventItem-rating">
                    <Rating rating={eventInfo.rating} number={eventInfo.numberOfRatings} />
                </span>
                <span className="EventItem-date">{eventInfo.time}, {eventInfo.date}</span>
            </span>
        </Link>
    );
};

export default EventItem;
