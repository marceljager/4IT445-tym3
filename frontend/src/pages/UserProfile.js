import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddToFriendsButton from '../components/AddToFriendsButton';
import Avatar from '../components/Avatar';

import { API_URL } from '../constants';

class UserProfileRaw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                id: 0
            }
        };
    }

    componentDidMount() {
        this.loadUserData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.user && this.state.user.id !== parseInt(nextProps.match.params.userId, 10)) {
            this.loadUserData(nextProps);
        }
    }

    loadUserData = (props) => {
        const { userId } = props.match.params;
        console.log('-> user: ', userId);
        const { accessToken } = props.user;
        axios.get(`${API_URL}/customers/${userId}?access_token=${accessToken}`, {
            userId
        })
            .then((response) => {
                console.log('--->', response);
                const user = response.data;
                this.setState({
                    user
                });
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    };

    render() {
        const { user } = this.state;
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-4">
                        <div className="Profile">
                            {user
                                ? <div className="Profile">
                                    <Avatar large user={user} />
                                    <span className="Profile-name">{user.username}</span>
                                    {user.id !== this.props.user.id &&
                                        <AddToFriendsButton id={user.id} onAddFriend={this.addToFriends} />
                                    }
                                </div>
                                : <div className="text-center">Uživatel nenalezen</div>
                            }
                        </div>
                    </div>
                    <div className="col-8">

                    </div>
                </div>
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
