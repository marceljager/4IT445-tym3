import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { API_URL } from '../constants';

class AddToFriendsButtonRaw extends Component {
    addToFriends = (userId) => {
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
        return (
            <button onClick={() => this.addToFriends(this.props.id)} className="Button">
                Add to friends
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
