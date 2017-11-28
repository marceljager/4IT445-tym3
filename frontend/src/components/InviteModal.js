import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import axios from 'axios';

import { API_URL } from '../constants';
import { isInObject } from '../functions';
import Avatar from './Avatar';

import feelsBadMan from '../img/noFriends.png';

class InviteModalRaw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            friends: [],
            modalVisible: false
        };
    }

    componentDidMount() {
        this.loadFriends();
    }

    openModal = () => {
        this.setState({
            modalVisible: true
        });
    };

    closeModal = () => {
        this.setState({
            modalVisible: false
        });
    };

    loadFriends = () => {
        const { id, accessToken } = this.props.user;
        axios.get(`${API_URL}/friendships/getFriends?custId=${id}&access_token=${accessToken}`)
            .then((response) => {
                const friends = response.data.data;
                this.setState({
                    friends
                });
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    };

    inviteUser = (invitedId, index) => {
        const { friends } = this.state;
        friends[index].invited = true;
        const { id, accessToken } = this.props.user;
        const { eventId } = this.props;

        axios.put(`${API_URL}/events/${eventId}/invited/rel/${invitedId}?from=${id}&access_token=${accessToken}`)
            .then(() => {
                this.setState({
                    friends
                });
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    };

    render() {
        let friends = [];
        if (this.state.friends.length > 0) {
            friends = this.state.friends.map((friend, index) => {
                if (friend.id !== this.props.user.id) {
                    return (
                        <div className="InviteModal-friend" key={friend.id}>
                            <div className="InviteModal-friendLeft">
                                <Avatar user={friend} />
                                <div className="InviteModal-friendName">
                                    {friend.friendName}
                                </div>
                            </div>
                            <div className="InviteModal-buttonContainer">
                                {this.props.guests && isInObject(friend, this.props.guests)
                                    ? 'Přijde'
                                    : <div>
                                        {friend.invited
                                            ? 'Pozvánka odeslána'
                                            : <button
                                                className="Button Button--small Button--secondary"
                                                onClick={() => this.inviteUser(friend.id, index)}
                                            >
                                                Pozvat
                                            </button>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    );
                }

                return null;
            });
        }

        return (
            <div>
                <div className={`InviteModal${this.state.modalVisible ? ' isVisible' : ''}`}>
                    <div className="InviteModal-overlay" role="button" tabIndex={0} onClick={this.closeModal} onKeyPress={this.closeModal} />
                    <div className="InviteModal-content">
                        <div className="InviteModal-header">
                            Pozvat přítele
                            <button className="InviteModal-close" onClick={this.closeModal} />
                        </div>
                        <div className="InviteModal-body">
                            {friends.length > 0
                                ? <div className="InviteModal-friendsContainer">
                                    {friends}
                                </div>
                                : <div className="InviteModal-noFriends">
                                    <div className="InviteModal-noFriendsImage">
                                        <img src={feelsBadMan} alt="FeelsBadMan" width={128} height={128} />
                                    </div>
                                    Nemáš kamarády
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <button className="Button Button--secondary Button--small" onClick={this.openModal}>
                    Pozvat přítele
                </button>
            </div>
        );
    }
}

InviteModalRaw.propTypes = {
    user: propTypes.shape({
        id: propTypes.number,
        accessToken: propTypes.string
    }),
    eventId: propTypes.string.isRequired,
    guests: propTypes.arrayOf(
        propTypes.shape({})
    )
};

InviteModalRaw.defaultProps = {
    user: {},
    guests: []
};

const mapStateToProps = (state) => {
    const { userData } = state;

    return {
        user: userData.user,
    };
};

const InviteModal = connect(mapStateToProps)(withRouter(InviteModalRaw));
export default InviteModal;
