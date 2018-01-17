import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { API_URL } from '../constants';

class AddToFriendsButtonRaw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSend: false
        }
    }

    addToFriends = (userId) => {
        this.setState({ isSend: true })

        const { id, accessToken } = this.props.user;
        axios.post(`${API_URL}/friendships?access_token=${accessToken}`, {
            customer1ID: id,
            customer2ID: userId
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    };

    render() {
        if (this.state.isSend) {
            return <strong>Žádost odeslána</strong>
        }

        return (
            <button onClick={() => this.addToFriends(this.props.id)} className="Button Button--secondary Button--small">
                Přidat do přátel
            </button>
        );
    }
}

const mapStateToProps = (state) => {
    const { userData } = state;

    return {
        user: userData.user,
    };
};

const AddToFriendsButton = connect(mapStateToProps)(withRouter(AddToFriendsButtonRaw));
export default AddToFriendsButton;
