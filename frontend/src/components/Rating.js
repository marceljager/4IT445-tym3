import React from 'react';
import ReactSVG from 'react-svg';

import RatingItem from './RatingItem';

import RatingIcon from '../img/icons/rating.svg';

const filled = (<span className="Rating-positive" />);
const empty = (<span className="Rating-neutral" />);

const Rating = (props) => {
    const ratingDoubled = parseFloat(props.rating) * 2;

    const ratingStars = [];
    let halfGroup = [];
    for (let i = 1; i <= 10; i += 1) {
        if (i < ratingDoubled) {
            halfGroup.push(filled);
        } else {
            halfGroup.push(empty);
        }

        if (i % 2 === 0) {
            ratingStars.push(<RatingItem item={halfGroup} />);
            halfGroup = [];
        }
    }

    return (
        <div className="Rating">
            <ReactSVG path={RatingIcon} className="" />
            {ratingStars}
        </div>
    );
};

export default Rating;
