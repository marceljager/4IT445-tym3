import React from 'react';
import ReactSVG from 'react-svg';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import noPhoto from '../img/icons/no-photo.svg';

import { URL } from '../constants';

const Avatar = ({ animated, user, large }) => (
    <Link to={`/uzivatel/${user.id}`} className={`Avatar${animated ? ' Avatar--animated' : ''}${large ? ' Avatar--large' : ''}`} key={user.id}>
        <span className="Avatar-imageContainer">
            {user.photo || user.picture
                ? <img src={`/upload/avatars/${user.photo ? user.photo : user.picture}`} alt={user.username} className="Avatar-photo" />
                : <ReactSVG path={noPhoto} className="Avatar-noPhoto" />
            }
        </span>
        <span className="Avatar-name">{user.username}</span>
    </Link>
);

Avatar.propTypes = {
    user: propTypes.shape({
        id: propTypes.number,
        photo: propTypes.string,
        username: propTypes.string
    }),
    animated: propTypes.bool,
    large: propTypes.bool
};

Avatar.defaultProps = {
    user: {
        id: 0,
        photo: '',
        username: ''
    },
    animated: false,
    large: false
};

export default Avatar;
