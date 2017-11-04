import React, { Component } from 'react';
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

        axios.post(`${API_URL}/profile.php`, {
            userId
        })
            .then((response) => {
                console.log(response);
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
                <h1>User profile</h1>
                {user
                    ? <div>{user.name}<AddToFriendsButton id={user.id} /></div>
                    : <div>user not found</div>
                }
            </div>
        );
    }
}

export default UserProfile;
