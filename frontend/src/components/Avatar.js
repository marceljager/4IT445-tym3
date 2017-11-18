import React from 'react';
import ReactSVG from 'react-svg';

import noPhoto from '../img/icons/no-photo.svg';

const Avatar = props => (
    <div className="Avatar" key={props.user.id}>
        {props.user.photo
            ? <img src={props.user.photo} alt={props.user.username} />
            : <ReactSVG path={noPhoto} className="Avatar-noPhoto" />
        }
    </div>
);

export default Avatar;