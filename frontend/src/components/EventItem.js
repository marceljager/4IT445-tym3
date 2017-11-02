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
            <div className="EventItem EventItem--compact">
                <div className="EventItem-image" style={itemStyle} />
                <div className="EventItem-textSide">
                    <span className="EventItem-title">{eventInfo.title}</span>
                    <span className="EventItem-place">{eventInfo.place}</span>
                    <span className="EventItem-time">{eventInfo.time}</span>
                    <span className="EventItem-time">{eventInfo.date}</span>
                    <div className="EventItem-badge">
                        {eventInfo.private
                            ? 'Soukromá'
                            : 'Veřejná'
                        }
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Link to="/detail-restaurace" className="EventItem">
            <div className="EventItem-image" style={itemStyle} />
            <div className="EventItem-textSide">
                <span className="EventItem-title">{eventInfo.title}</span>
                <div className="EventItem-place">
                    {eventInfo.place}
                    <Rating rating={eventInfo.rating} />
                </div>
                <span className="EventItem-time">{eventInfo.time}</span>
                <span className="EventItem-time">{eventInfo.date}</span>
                <div className="EventItem-badge">
                    {eventInfo.private
                        ? 'Soukromá'
                        : 'Veřejná'
                    }
                </div>
            </div>
        </Link>
    );
};

export default EventItem;
