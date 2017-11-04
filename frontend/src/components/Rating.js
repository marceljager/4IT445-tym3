import React from 'react';

import RatingItem from './RatingItem';

const filled = (<span className="Rating-positive" />);
const empty = (<span className="Rating-neutral" />);

const Rating = (props) => {
    const ratingDoubled = parseFloat(props.rating) * 2;

    const ratingStars = [];
    let halfGroup = [];
    for (let i = 1; i <= 11; i += 1) {
        if (i <= ratingDoubled) {
            halfGroup.push(filled);
        } else {
            halfGroup.push(empty);
        }

        if (i % 2 === 0) {
            ratingStars.push(<RatingItem key={i} item={halfGroup} />);
            halfGroup = [];
        }
    }

    return (
        <div className="Rating">
            {ratingStars}
            {props.number &&
                <div className="Rating-number">
                    <span className="Link">{props.number} hodnocení</span>
                </div>
            }
        </div>
    );
};

export default Rating;
