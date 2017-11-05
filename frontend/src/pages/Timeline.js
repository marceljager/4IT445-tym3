import React, { Component } from 'react';
import { FormattedDate } from 'react-intl';
import { Link } from 'react-router-dom';

import TodayEvents from '../components/TodayEvents';
import Notification from '../components/Notification';

const notificationsObject = [
    {
        userName: 'Mirek',
        userId: '1422340757',
        type: 'comment',
        date: '2 minutami',
        unread: true
    }, {
        userName: 'Roman',
        userId: '1702981537',
        type: 'attend',
        name: 'Slavnostní otevření restaurace Marjánka',
        date: '4 minutami',
        unread: true
    }, {
        userName: 'Mirek',
        userId: '1422340757',
        type: 'photo',
        photo: 'photo.png',
        date: '7 minutami',
        unread: true
    }, {
        userName: 'Mirek',
        userId: '1422340757',
        type: 'invited',
        name: 'Slavnostní otevření restaurace Marjánka',
        date: '9 minutami',
        unread: true
    }, {
        userName: 'Roman',
        userId: '1702981537',
        type: 'created',
        name: 'Slavnostní otevření restaurace Marjánka',
        date: '10 minutami'
    }, {
        userName: 'Mirek',
        userId: '1422340757',
        type: 'rated',
        name: 'Slavnostní otevření restaurace Marjánka',
        rating: 3.5,
        date: '13 minutami'
    }
];

const date = new Date();
const tommorow = date.setDate(date.getDate() + 1);

class Timeline extends Component{
    constructor(props) {
        super(props);

        this.state = {
            notifications: notificationsObject
        };
    }

    handleReadAllClick = () => {
        const { notifications } = this.state;
        notifications.map((item) => {
            item.unread = false;
            return null;
        });

        this.setState({ notifications });
    };

    setRead = (index) => {
        const { notifications } = this.state;
        notifications[index].unread = false;

        this.setState({ notifications });
    };

    render() {
        const items = this.state.notifications.map((notification, index) => <Notification key={index.toString()} item={notification} index={index} onSetRead={this.setRead} />);

        return (
            <div className="container mb-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-9">
                        <div className="row mt-5">
                            <div className="col-8">
                                <div className="EventsContainer">
                                    <div className="EventsContainer-top">
                                        <span><strong>Dnes</strong> na programu</span>
                                        <span><FormattedDate value={Date.now()} day="numeric" month="long" /></span>
                                    </div>
                                    <div className="EventsContainer-content">
                                        <TodayEvents />
                                    </div>
                                </div>
                                <div className="EventsContainer EventsContainer--new">
                                    <span className="EventsContainer-title">Nezaujala tě žádná dnešní akce?</span>
                                    <Link to="/nova-udalost/krok-1" className="Button Button--secondary Button--big">Vytvoř novou akci</Link>
                                </div>
                                <div className="EventsContainer">
                                    <div className="EventsContainer-top">
                                        <span><strong>Zítřejší</strong> akce</span>
                                        <span><FormattedDate value={tommorow} day="numeric" month="long" /></span>
                                    </div>
                                    <div className="EventsContainer-content">
                                        <TodayEvents />
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="Notifications">
                                    <div className="Notifications-header">
                                        <span className="Notifications-title">Co se děje</span>
                                        <button className="Link" onClick={this.handleReadAllClick}>
                                            Přečteno
                                        </button>
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
        );
    }
};

export default Timeline;
