import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { FormattedRelative } from 'react-intl';

import Rating from './Rating';
import Avatar from './Avatar';

const Notification = (props) => {
    const { item } = props;

    const user = {
        id: item.customerID,
        photo: item.customerPhoto,
        username: item.fromName
    };

    let title;
    let simple;
    console.log(item);
    switch (item.notifType) {
    case 'comment':
        title = 'přidal nový komentář';
        break;
    case 'attend':
        simple = true;
        title = 'se zúčastní akce';
        break;
    case 'photo':
        title = 'přidal novou fotku';
        break;
    case 'invitation':
        simple = true;
        title = 'tě pozval na';
        break;
    case 'rated':
        simple = true;
        title = 'ohodnotil akci';
        break;
    case 'created':
        simple = true;
        title = 'založil akci';
        break;
    default:
        simple = true;
        title = '';
        break;
    }

    return (
        <div className={`Notifications-item${item.unread ? ' Notifications-item--unread' : ''}`}>
            <div className="Notifications-avatarContainer">
                <img src={`./icons/${item.notifType}.svg`} className="Notifications-icon" alt="" width="16" height="16" />
                <Avatar user={user} />
            </div>
            <div className="Notifications-textColumn">
                <span className={`Notifications-itemTitle ${simple ? 'Notifications-itemTitle--simple' : ''}`}>{item.text}</span>
                {simple &&
                    <div className="Notifications-eventName">{item.name}</div>
                }
                {item.notiftype === 'photo' &&
                    <div className="Notifications-thumbnailContainer">
                        <img src={`./upload/userUpload/${item.photo}`} alt="" className="Notifications-thumbnail" />
                    </div>
                }
                {(item.notifType === 'invitation' || item.notifType === 'comment') &&
                    <div className="Notifications-container">
                        <Link to={`/detail-akce/${item.referenceID}`} className="Button Button--secondary Button--small">Zobrazit</Link>
                    </div>
                }
                {item.rating &&
                    <div className="Notifications-container">
                        <Rating rating={item.rating} />
                    </div>
                }
                {/*
                <div className="Notifications-date">
                    <FormattedRelative value={item.invSendDate} />
                </div>
                */}
            </div>
        </div>
    );
};

Notification.propTypes = {
    item: propTypes.shape({
        fromPic: propTypes.string,
        fromName: propTypes.string,
        notifType: propTypes.string,
        eventID: 0,
        invSendDate: propTypes.string
    }),
    onSetRead: propTypes.func.isRequired,
    index: propTypes.number.isRequired
};

Notification.defaultProps = {
    item: {
        email: ''
    }
};

export default Notification;
