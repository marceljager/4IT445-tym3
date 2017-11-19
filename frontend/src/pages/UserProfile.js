import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import { AddToFriendsButton } from '../components/AddToFriendsButton';

import { API_URL } from '../constants';

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }

    componentDidMount() {
        const { userId } = this.props.match.params;
        // TODO IMPLEMENTOVAT API
        axios.post(`${API_URL}/profile.php`, {
            userId
        })
            .then((response) => {
                const { user } = response.data;
                this.setState({
                    user
                });
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    }

    addToFriends = (id) => {
        console.log(id);
    };

    render() {
        const { user } = this.state;
        return (
            <div>
                <h1>User profile -
                    {user
                        ? <div>{user.name}<AddToFriendsButton id={user.id} /></div>
                        : <div>user not found</div>
                    }
                </h1>
            </div>
        );
    }
}

UserProfile.propTypes = {
    match: propTypes.shape({
        params: propTypes.shape({
            userId: propTypes.string
        })
    }),
};

UserProfile.defaultProps = {
    match: {
        params: {
            userId: 0
        }
    }
};

export default UserProfile;
