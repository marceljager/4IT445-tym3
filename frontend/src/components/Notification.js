import React from 'react';

import Rating from './Rating';

const Notification = (props) => {
    const { item } = props;
    const imageSource = `https://graph.facebook.com/${item.userId}/picture`;

    let title;
    let simple;
    switch (item.type) {
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
    case 'invited':
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
                <img src={`./icons/${item.type}.svg`} className="Notifications-icon" alt="" width="16" height="16" />
                <div className="Notifications-avatar">
                    <img src={imageSource} className="Notifications-image" alt="" />
                </div>
            </div>
            <div className="Notifications-textColumn">
                <span className={`Notifications-itemTitle ${simple ? 'Notifications-itemTitle--simple' : ''}`}>{item.userName} {title}</span>
                {simple &&
                    <div className="Notifications-eventName">{item.name}</div>
                }
                {item.type === 'photo' &&
                    <div className="Notifications-thumbnailContainer">
                        <img src={`./upload/userUpload/${item.photo}`} alt="" className="Notifications-thumbnail" />
                    </div>
                }
                {item.type === 'invited' &&
                    <div className="Notifications-container">
                        <button className="Button Button--secondary Button--small">Zobrazit</button>
                    </div>
                }
                {item.rating &&
                    <div className="Notifications-container">
                        <Rating rating={item.rating} />
                    </div>
                }
                <div className="Notifications-date">před {item.date}</div>
            </div>
        </div>
    );
};

export default Notification;