import React from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';
import propTypes from 'prop-types';
import AddToCalendar from 'react-add-to-calendar';

const Calendar = (props) => {
    const { dateFrom, dateTo, addToCalendar } = props;
    return (
        <div className="Calendar">
            <div className="Calendar-box">
                <div className="Calendar-dayName"><FormattedDate value={dateFrom} weekday="long" /></div>
                <div className="Calendar-day"><FormattedDate value={dateFrom} day="numeric" /></div>
                <div className="Calendar-month"><FormattedDate value={dateFrom} month="long" /></div>
                <div className="Calendar-time">
                    <FormattedTime value={dateFrom} hour="numeric" minute="numeric" /> - <FormattedTime value={dateTo} hour="numeric" minute="numeric" />
                </div>
            </div>
            {addToCalendar &&
                <div className="Calendar-buttonContainer">
                    <AddToCalendar buttonClassClosed="Button Button--red Button--wide Button--small" dropdownClass="Calendar-dropdown" buttonLabel="Do kalendáře" event={addToCalendar} />
                </div>
            }
        </div>
    );
};

Calendar.propTypes = {
    dateFrom: propTypes.string.isRequired,
    dateTo: propTypes.string.isRequired,
    addToCalendar: propTypes.oneOfType([
        propTypes.bool,
        propTypes.shape({})
    ])
};

Calendar.defaultProps = {
    addToCalendar: false
};

export default Calendar;
