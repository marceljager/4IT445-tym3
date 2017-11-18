import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
        this.loadUsers();
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

    loadUsers = () => {
        // TODO CHANGE TO FRIENDS ONLY
        axios.get(`${API_URL}/customers?access_token=${this.props.user.accessToken}`)
            .then((response) => {
                const friends = response.data;
                this.setState({
                    friends
                });
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    };

    inviteUser = (id, index) => {
        const { friends } = this.state;
        friends[index].invited = true;
        const { eventId } = this.props.match.params;

        axios.put(`${API_URL}/events/${eventId}/invited/rel/${id}?access_token=${this.props.user.accessToken}`)
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
        let friends = this.state.friends.map((friend, index) => (
            <div className="InviteModal-friend" key={friend.id}>
                <div className="InviteModal-friendLeft">
                    <Avatar user={friend} />
                    <div className="InviteModal-friendName">
                        {friend.username}
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
        ));

        return (
            <div>
                <div className={`InviteModal${this.state.modalVisible ? ' isVisible' : ''}`}>
                    <div className="InviteModal-overlay" onClick={this.closeModal} />
                    <div className="InviteModal-content">
                        <div className="InviteModal-header">
                            Pozvat přítele
                            <button className="InviteModal-close" onClick={this.closeModal} />
                        </div>
                        <div className="InviteModal-body">
                            {friends.length > 0
                                ?
                                <div className="InviteModal-friendsContainer">
                                    {friends}
                                </div>
                                :
                                <div className="InviteModal-noFriends">
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

const mapStateToProps = (state) => {
    const { userData } = state;

    return {
        user: userData.user,
    };
};

const InviteModal = connect(mapStateToProps)(withRouter(InviteModalRaw));
export default InviteModal;
