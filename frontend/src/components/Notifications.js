import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import axios from 'axios';

import Notification from './Notification';

import { API_URL } from '../constants';

class NotificationsRaw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount() {
        if (this.props.user.id) {
            this.loadNotifications();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.id) {
            this.loadNotifications();
        }
    }

    setRead = (index) => {
        const { data } = this.state;
        data[index].unread = false;

        this.setState({ data });
    };

    loadNotifications = () => {
        const { id, accessToken } = this.props.user;
        axios.get(`${API_URL}/invitations/getInfo?invId=${id}&access_token=${accessToken}`)
            .then((response) => {
                this.setState({
                    data: response.data.data
                });
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    };

    render() {
        let items = [];
        if (this.state.data.length > 0) {
            items = this.state.data.map((notification, index) => (
                <Notification key={index.toString()} item={notification} index={index} onSetRead={this.setRead} />
            ));
        }
        return (
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
        );
    }
}

NotificationsRaw.propTypes = {
    user: propTypes.shape({
        id: propTypes.number,
        accessToken: propTypes.string
    })
};

NotificationsRaw.defaultProps = {
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

const Notifications = connect(mapStateToProps)(NotificationsRaw);

export default Notifications;
