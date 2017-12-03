import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { FormattedDate, FormattedTime } from 'react-intl';

import Rating from './Rating';

const EventItem = (props) => {
    const { itemType, eventInfo, date } = props;
    console.log(eventInfo);
    const itemStyle = {
        backgroundImage: `url(../upload/eventImages/${eventInfo.picture})`
    };

    const isEventAtDate = new Date(eventInfo.dateFrom).toDateString() === new Date(date).toDateString();

    if (isEventAtDate || !date) {
        if (itemType === 'compact') {
            return (
                <Link to={`/detail-akce/${eventInfo.id}`} className="EventItem EventItem--compact">
                    <span className="EventItem-image" style={itemStyle}>
                        <span className="EventItem-badge">
                            {eventInfo.private
                                ? 'Soukromá'
                                : 'Veřejná'
                            }
                        </span>
                    </span>
                    <span className="EventItem-textSide">
                        <span className="EventItem-title">{eventInfo.name}</span>
                        <span className="EventItem-place">
                            {eventInfo.place}
                            <span className="EventItem-rating">
                                <Rating rating={eventInfo.rating} />
                            </span>
                        </span>
                        <span className="EventItem-date">
                            <FormattedTime value={eventInfo.dateFrom} hour="numeric" minute="numeric" />
                            {eventInfo.dateTo && ' - '}
                            {eventInfo.dateTo && <FormattedTime value={eventInfo.dateTo} hour="numeric" minute="numeric" />}
                            , <FormattedDate value={eventInfo.dateFrom} day="numeric" month="long" />
                        </span>
                    </span>
                </Link>
            );
        }

        return (
            <Link to={`/detail-akce/${eventInfo.id}`} className="EventItem">
                <span className="EventItem-image" style={itemStyle}>
                    <span className={`EventItem-badge${eventInfo.private ? ' EventItem-badge--private' : ''}`}>
                        {eventInfo.private
                            ? 'Soukromá'
                            : 'Veřejná'
                        }
                    </span>
                </span>
                <span className="EventItem-textSide">
                    <span className="EventItem-title">{eventInfo.name}</span>
                    <span className="EventItem-place">
                        {eventInfo.place}
                    </span>
                    <span className="EventItem-rating">
                        <Rating rating={eventInfo.rating} number={eventInfo.numberOfRatings} />
                    </span>
                    <span className="EventItem-date">
                        <FormattedTime value={eventInfo.dateFrom} hour="numeric" minute="numeric" />
                        {eventInfo.dateTo && ' - '}
                        {eventInfo.dateTo && <FormattedTime value={eventInfo.dateTo} hour="numeric" minute="numeric" />}
                        , <FormattedDate value={eventInfo.dateFrom} day="numeric" month="long" />
                    </span>
                </span>
            </Link>
        );
    }

    return [];
};

EventItem.propTypes = {
    eventInfo: propTypes.shape({
        id: propTypes.number,
        private: propTypes.number,
        place: propTypes.string,
        dateTo: propTypes.string,
        dateFrom: propTypes.string,
        name: propTypes.string,
        rating: propTypes.number,
        numberOfRatings: propTypes.number
    }),
    itemType: propTypes.string
};

EventItem.defaultProps = {
    eventInfo: {
        numberOfRatings: 0,
        rating: 0
    },
    itemType: ''
};

export default EventItem;
