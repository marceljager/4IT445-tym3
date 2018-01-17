import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import { API_URL } from '../constants';


import EventItem from './EventItem';

class UpcomingEvents extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            events: []
        };
    }

    componentDidMount() {
        if (this.props.user.id) {
            this.loadUpcomingEvents(this.props.user);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.id) {
            this.loadUpcomingEvents(nextProps.user);
        }
    }

    loadUpcomingEvents = (user) => {
        const { id, accessToken } = user;
        axios.get(`${API_URL}/customers/${id}/Attends?access_token=${accessToken}`)
            .then((response) => {
                const events = response.data;
                console.log(response);
                this.setState({
                    events
                });
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    };

    render() {
        let upcomingEvents = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (this.state.events) {
            upcomingEvents = this.state.events.map((event, index) => {
                const varDate = new Date(event.dateFrom);

                if (varDate > today) {
                    return (
                        <EventItem key={index.toString()} eventInfo={event} itemType="simple"/>
                    );
                }
            });
        }

        return (
            <div className="Notifications">
                <div className="Notifications-header">
                    <span className="Notifications-title">Kam jdeš</span>
                </div>
                <div className="Notifications-itemsContainer">
                    {upcomingEvents.length === 0
                        ? <div className="py-4 text-center">Zatím se neúčastníš žádných akcí</div>
                        : upcomingEvents
                    }
                </div>
            </div>
        );
    }
}

UpcomingEvents.propTypes = {
    events: propTypes.arrayOf(
        propTypes.shape({}),
    ),
};

UpcomingEvents.defaultProps = {
    events: []
};

const mapStateToProps = (state) => {
    const { userData } = state;

    return {
        user: userData.user,
    };
};

export default connect(mapStateToProps)(UpcomingEvents);

