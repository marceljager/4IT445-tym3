import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddToFriendsButton from '../components/AddToFriendsButton';

import { API_URL } from '../constants';

class UserProfileRaw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }

    componentDidMount() {
        const { userId } = this.props.match.params;
        const { accessToken } = this.props.user;
        // TODO IMPLEMENTOVAT API
        axios.get(`${API_URL}/customers/${userId}?access_token=${accessToken}`, {
            userId
        })
            .then((response) => {
                const user = response.data;
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
                        ? <div>
                            {user.username}
                            {user.id !== this.props.user.id && <AddToFriendsButton id={user.id} onAddFriend={this.addToFriends} />}
                        </div>
                        : <div>user not found</div>
                    }
                </h1>
            </div>
        );
    }
}

UserProfileRaw.propTypes = {
    match: propTypes.shape({
        params: propTypes.shape({
            userId: propTypes.string
        })
    }),
};

UserProfileRaw.defaultProps = {
    match: {
        params: {
            userId: 0
        }
    }
};

const mapStateToProps = (state) => {
    const { userData } = state;

    return {
        user: userData.user,
    };
};

const UserProfile = connect(mapStateToProps)(withRouter(UserProfileRaw));
export default UserProfile;
