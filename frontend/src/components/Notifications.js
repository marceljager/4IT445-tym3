import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        this.loadNotifications();
    }

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

    setRead = (index) => {
        const { data } = this.state;
        data[index].unread = false;

        this.setState({ data });
    };

    render() {
        let items = [];
        console.log(this.state.data)
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
        )
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
