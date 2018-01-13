import React, { Component } from 'react';
import { FormattedDate } from 'react-intl';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import axios from 'axios';

import EventsFeed from '../components/EventsFeed';
import Notifications from '../components/Notifications';
import UpcomingEvents from '../components/UpcomingEvents';

import { API_URL } from '../constants';
import { isInObject } from '../functions';

const date = new Date();
const tommorow = date.setDate(date.getDate() + 1);

class TimelineRaw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: []
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
        const { id, accessToken } = this.props.user;
        axios.get(`${API_URL}/customers/feed?custId=${id}&access_token=${accessToken}`)
            .then((response) => {
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
                    <div className="col-12 col-xl-9">
                        <div className="row mt-5">
                            <div className="col-12 col-md-8">
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
                                        <span><strong>Ostatní</strong> akce</span>
                                    </div>
                                    <div className="EventsContainer-content">
                                        <EventsFeed events={this.state.events} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <UpcomingEvents />
                                <Notifications />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TimelineRaw.propTypes = {
    user: propTypes.shape({
        id: propTypes.number,
        accessToken: propTypes.string
    })
};

TimelineRaw.defaultProps = {
    user: {
        id: 0,
        accessToken: ''
    }
};

const mapStateToProps = (state) => {
    const { userData } = state;

    return {
        user: userData.user,
    };
};

const Timeline = connect(mapStateToProps)(TimelineRaw);
export default Timeline;
