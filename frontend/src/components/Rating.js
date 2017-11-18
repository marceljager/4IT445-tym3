import React from 'react';

import RatingItem from './RatingItem';

const filled = key => (<span className="Rating-positive" key={key} />);
const empty = key => (<span className="Rating-neutral" key={key} />);

const Rating = (props) => {
    const ratingDoubled = parseFloat(props.rating) * 2;

    const ratingStars = [];
    let halfGroup = [];
    for (let i = 1; i <= 11; i += 1) {
        if (i <= ratingDoubled) {
            halfGroup.push(filled(i));
        } else {
            halfGroup.push(empty(i));
        }

        if (i % 2 === 0) {
            ratingStars.push(<RatingItem key={i} item={halfGroup} />);
            halfGroup = [];
        }
    }

    return (
        <div className="Rating">
            {ratingStars}
            {(props.number || props.number === 0) &&
                <div className="Rating-number">
                    <span className="Link">{props.number} hodnocení</span>
                </div>
            }
        </div>
    );
};

export default Rating;
