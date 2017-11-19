import React, { Component } from 'react';
import { FormattedDate } from 'react-intl';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import EventsFeed from '../components/EventsFeed';
import Notifications from '../components/Notifications';

import { API_URL } from '../constants';
import { isInObject } from '../functions';

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

class TimelineRaw extends Component{
    constructor(props) {
        super(props);

        this.state = {
            notifications: notificationsObject
        };
    }

    componentDidMount() {
        if (this.props.user.id) {
            this.loadPublicFeed();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.id) {
            this.loadPublicFeed();
        }
    }

    loadPublicFeed() {
        axios.get(`${API_URL}/events/publicFeed`)
            .then((response) => {
                const publicFeed = response.data.data;
                this.loadPersonalFeed(publicFeed);
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    }

    loadPersonalFeed(publicFeed) {
        axios.get(`${API_URL}/customers/feed?custId=${this.props.user.userId}&access_token=${this.props.user.accessToken}`)
            .then((response) => {
                console.log(publicFeed);
                console.log(response);
                const events = response.data.data;
                events.forEach((feedItem) => {
                    if (!isInObject(feedItem, events)) {
                        publicFeed.push(feedItem);
                    }
                });

                this.setState({
                    events
                });
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    }

    handleReadAllClick = () => {
        const { notifications } = this.state;
        notifications.map((item) => {
            item.unread = false;
            return null;
        });

        this.setState({ notifications });
    };

    render() {
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
                                        <EventsFeed events={this.state.events} date={Date.now()} />
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
                                        <EventsFeed events={this.state.events} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <Notifications />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { userData } = state;

    return {
        user: userData.user,
    };
};

const Timeline = connect(mapStateToProps)(TimelineRaw);
export default Timeline;
