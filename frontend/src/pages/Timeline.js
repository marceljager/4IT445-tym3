import React from 'react';

import TodayEvents from '../components/TodayEvents';
import Notification from '../components/Notification';

const notificationsObject = [
    {
        userName: 'Mirek',
        userId: '1422340757',
        type: 'comment',
        date: '2 minutami',
        unread: true
    },{
        userName: 'Roman',
        userId: '1702981537',
        type: 'attend',
        name: 'Nefunkční internet',
        date: '4 minutami',
        unread: true
    },{
        userName: 'Mirek',
        userId: '1422340757',
        type: 'photo',
        photo: 'photo.png',
        date: '7 minutami'
    },{
        userName: 'Mirek',
        userId: '1422340757',
        type: 'invited',
        name: 'Nefunkční internet',
        date: '9 minutami'
    },{
        userName: 'Roman',
        userId: '1702981537',
        type: 'created',
        name: 'Nefunkční internet',
        date: '10 minutami'
    },{
        userName: 'Mirek',
        userId: '1422340757',
        type: 'rated',
        name: 'Nefunkční internet',
        rating: 3.5,
        date: '13 minutami'
    }
];

const Timeline = () => {
    const items = notificationsObject.map(notification => <Notification item={notification} />);

    return (
        <div className="PageContent--background">
            <div className="container mb-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-9">
                        <div className="row mt-5">
                            <div className="col-8">
                                <div className="row">
                                    <h4 className="my-4"><strong>Dnes</strong> na programu</h4>
                                    <TodayEvents />
                                </div>
                                <div className="row">
                                    <h4 className="my-4"><strong>Zítřejší</strong> akce</h4>
                                    <TodayEvents />
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="Notifications">
                                    <div className="Notifications-header">
                                        <span className="Notifications-title">Co se děje (2)</span>
                                        <button className="Link">Přečteno</button>
                                    </div>
                                    <div className="Notifications-itemsContainer">
                                        {items}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timeline;
