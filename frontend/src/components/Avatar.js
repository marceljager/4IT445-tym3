import React from 'react';
import ReactSVG from 'react-svg';
import propTypes from 'prop-types';

import noPhoto from '../img/icons/no-photo.svg';

const Avatar = props => (
    <div className={`Avatar${props.animated ? ' Avatar--animated' : ''}`} key={props.user.id}>
        <div className="Avatar-imageContainer">
            {props.user.photo
                ? <img src={props.user.photo} alt={props.user.username} className="Avatar-photo" />
                : <ReactSVG path={noPhoto} className="Avatar-noPhoto" />
            }
        </div>
        <span className="Avatar-name">{props.user.username}</span>
    </div>
);

Avatar.propTypes = {
    user: propTypes.shape({
        id: propTypes.number,
        photo: propTypes.string,
        username: propTypes.string
    }),
    animated: propTypes.bool
};

Avatar.defaultProps = {
    user: {
        id: 0,
        photo: '',
        username: ''
    },
    animated: false
};

export default Avatar;
