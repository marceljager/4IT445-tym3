import React from 'react';
import propTypes from 'prop-types';

const RatingItem = props => (
    <div className="Rating-item">{props.item}</div>
);

RatingItem.propTypes = {
    item: propTypes.arrayOf(
        propTypes.element
    ).isRequired
};

export default RatingItem;
