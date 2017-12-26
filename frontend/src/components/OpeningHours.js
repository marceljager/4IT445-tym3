import React from 'react';
import propTypes from 'prop-types';

import EventItem from './EventItem';

const OpeningHours = (props) => {
    let openingHours = [];
    if (props.data) {
        const parsedData = JSON.parse(props.data);
        openingHours = parsedData.map((day, index) => (
            <tr key={index.toString()}>
                <th>{day.split(': ')[0]}</th>
                <td>{day.split(': ')[1]}</td>
            </tr>
        ));
    }

    return (
        <table className="OpeningHours">
            <tbody>
                {openingHours}
            </tbody>
        </table>
    );
};

OpeningHours.propTypes = {
    data: propTypes.string
};

OpeningHours.defaultProps = {
    data: ''
};

export default OpeningHours;
