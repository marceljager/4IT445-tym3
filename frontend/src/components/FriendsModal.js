import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import propTypes from 'prop-types';
import axios from 'axios';
import ReactSVG from 'react-svg';

import { API_URL } from '../constants';
import Avatar from './Avatar';

import feelsBadMan from '../img/noFriends.png';
import friendsIcon from '../img/icons/friends.svg';

class FriendsModalRaw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            friends: [],
            friendRequests: [],
            modalVisible: false
        };
    }

    componentDidMount() {
        this.loadFriends();
        this.fetchFriendRequests();
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

    fetchFriendRequests = () => {
        const { id, accessToken } = this.props.user;
        axios.get(`${API_URL}/customers/getReqsMine?custId=${id}&access_token=${accessToken}`)
            .then((response) => {
                this.setState({
                    friendRequests: response.data.data
                });
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    };

    removeFriend = (friendshipId, index) => {
        const { friends } = this.state;
        const { accessToken } = this.props.user;

        const newFriendsArray = friends;
        newFriendsArray.splice(index, 1);

        axios.delete(`${API_URL}/friendships/${friendshipId}`, {
            access_token: accessToken
        })
            .then((reponse) => {
                console.log(reponse);
                this.setState({ friends: newFriendsArray });
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    };

    acceptFriendRequest = (item) => {
        const { relationID } = item;
        const { accessToken } = this.props.user;
        axios.post(`${API_URL}/customers/accept?reqId=${relationID}&access_token=${accessToken}`)
            .then(() => {
                const { friendRequests } = this.state;
                const newArray = friendRequests.filter(el => (
                    el.relationID !== relationID
                ));

                this.setState({
                    friendRequests: newArray
                });

                this.loadFriends();
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    };

    render() {
        let friends = [];
        if (this.state.friends.length > 0) {
            friends = this.state.friends.map((friend, index) => {
                const id = friend.customer1ID === this.props.user.id ? friend.customer2ID : friend.customer1ID;
                const friendInfo = {
                    id,
                    username: friend.friendName,
                    photo: friend.friendPic
                };

                return (
                    <div className="FriendsModal-friend" key={friend.id}>
                        <div className="FriendsModal-friendLeft">
                            <Avatar user={friendInfo} />
                            <Link to={`/uzivatel/${id}`} className="FriendsModal-friendName">
                                {friend.friendName}
                            </Link>
                        </div>
                        <div className="FriendsModal-buttonContainer">
                            <button className="Button Button--small Button--gray" onClick={() => this.removeFriend(id, index)}>Odebrat</button>
                        </div>
                    </div>
                );
            });
        }

        const requestList = this.state.friendRequests.map((item, index) => (
            <div className="Requests-item d-flex justify-content-between" key={index}>
                <div className="d-flex align-items-center">
                    <Avatar user={item} />
                    <Link to={`/uzivatel/${item.id}`} className="Requests-username">
                        {item.username}
                    </Link>
                </div>
                <div className="Requests-buttonsContainer">
                    <button className="Button Button--small Button--secondary mr-2" onClick={() => this.acceptFriendRequest(item)}>Přijmout</button>
                    <button className="Button Button--small Button--gray">Odmítnout</button>
                </div>
            </div>
        ));

        return (
            <div>
                <div className={`FriendsModal${this.state.modalVisible ? ' isVisible' : ''}`}>
                    <div className="FriendsModal-overlay" role="button" tabIndex={0} onClick={this.closeModal} onKeyPress={this.closeModal} />
                    <div className="FriendsModal-content">
                        <div className="FriendsModal-header">
                            Vaši přátelé
                            <button className="FriendsModal-close" onClick={this.closeModal} />
                        </div>
                        <div className="FriendsModal-body">
                            {requestList.length > 0 &&
                                <div className="FriendsModal-friendsContainer FriendsModal-friendsContainer--requests">
                                    {requestList}
                                </div>
                            }
                            {friends.length > 0
                                ? <div className="FriendsModal-friendsContainer">
                                    {friends}
                                </div>
                                : <div className="FriendsModal-noFriends">
                                    <div className="FriendsModal-noFriendsImage">
                                        <img src={feelsBadMan} alt="FeelsBadMan" width={128} height={128} />
                                    </div>
                                    Nemáš kamarády
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div onClick={this.openModal} className="FriendsModal-iconContainer">
                    <ReactSVG path={friendsIcon} className="FriendsModal-icon" />
                </div>
            </div>
        );
    }
}

FriendsModalRaw.propTypes = {
    user: propTypes.shape({
        id: propTypes.number,
        accessToken: propTypes.string
    }),
    eventId: propTypes.string.isRequired,
    guests: propTypes.arrayOf(
        propTypes.shape({})
    )
};

FriendsModalRaw.defaultProps = {
    user: {},
    guests: []
};

const mapStateToProps = (state) => {
    const { userData } = state;

    return {
        user: userData.user,
    };
};

const FriendsModal = connect(mapStateToProps)(withRouter(FriendsModalRaw));
export default FriendsModal;
