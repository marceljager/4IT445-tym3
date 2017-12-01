import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import ReactSVG from 'react-svg';
import axios from 'axios';

import SearchBar from './SearchBar';
import Avatar from './Avatar';

import LogoImg from '../img/logo.svg';
import FriendRequestsImg from '../img/icons/friend-requests.svg';

import { logIn, logOut } from '../actions/user';

import { API_URL } from '../constants';

class MenuRaw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            friendRequests: []
        };
    }

    componentDidMount() {
        this.autoLogin();
    }

    componentWillReceiveProps(props) {
        if (props.user.realm) {
            this.fetchFriendRequests(props.user.accessToken, props.user.id);
        }
    }

    autoLogin = () => {
        const user = localStorage.getItem('user');
        if (user) {
            const userData = JSON.parse(user);
            this.props.logIn(userData);
        }
    };

    fetchFriendRequests = (accessToken, id) => {
        axios.get(`${API_URL}/customers/getReqsMine?custId=${id}&access_token=${accessToken}`)
            .then((response) => {
                this.setState({
                    friendRequests: response.data.data
                })
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    };

    logout = () => {
        localStorage.removeItem('user');
        this.props.logOut();
        this.props.history.push('/landing');
    };

    render() {
        const { user, location } = this.props;
        const MenuClass = `Menu ${location.pathname === '/' || location.pathname === '/registrace' ? 'isHidden' : ''} ${location.pathname === '/landing' ? 'Menu--transparent' : ''}`;

        const requestList = this.state.friendRequests.map(item => (
            <div className="Requests-item">
                <Avatar user={user} />
                <span className="Requests-username">{item.username}</span>
                <div className="Requests-buttonsContainer">
                    <button className="Button Button--small Button--secondary mr-2">Přijmout</button>
                    <button className="Button Button--small Button--gray">Odmítnout</button>
                </div>
            </div>
        ));

        return (
            <div className={MenuClass}>
                <div className="Menu-fixed">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <div className="row">
                                    <div
                                        className={`col-5 align-items-center${location.pathname === '/landing' ? ' d-none' : ' d-flex'}`}
                                    >
                                        <Link to={user.email ? '/timeline' : '/landing'} className="Menu-logo">
                                            <ReactSVG path={LogoImg} className="Menu-logoIcon" />
                                        </Link>
                                        <SearchBar />
                                    </div>
                                    <div
                                        className={`d-flex align-items-center justify-content-end${location.pathname === '/landing' ? ' col-12' : ' col-7'}`}
                                    >
                                        {user.email &&
                                        <div className="d-flex align-items-center">
                                            <Avatar user={user} />
                                            <div className="Menu-user">{user.username}</div>
                                        </div>
                                        }

                                        {user.email &&
                                        <ul className="Menu-navigationItemsContainer d-flex">
                                            <li className="Menu-navigationItem">
                                                <ReactSVG path={FriendRequestsImg} className="Menu-friendRequests" />
                                                <div className="Menu-dropdown">
                                                    <div className="Requests">
                                                        <div className="Requests-title">
                                                            Žádosti o přátelství
                                                        </div>
                                                        {requestList}
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="Menu-navigationItem">
                                                <Link
                                                    to="/nova-udalost/krok-1"
                                                    className={`Menu-link ${location.pathname.indexOf('nova-udalost') > 0 ? 'isActive' : ''}`}
                                                >
                                                    Nová akce
                                                </Link>
                                            </li>
                                            <li className="Menu-navigationItem">
                                                <Link
                                                    to="/timeline"
                                                    className={`Menu-link ${location.pathname === '/timeline' ? 'isActive' : ''}`}
                                                >
                                                    Akce v okolí
                                                </Link>
                                            </li>
                                            <li className="Menu-navigationItem">
                                                <button className="Button Button--logout Button--small Button--red" onClick={this.logout}>Odhlásit se</button>
                                            </li>
                                        </ul>
                                        }

                                        {!user.email &&
                                        <Link to="/" className="Button Button--secondary Button--small">
                                            Přihlásit se
                                        </Link>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

MenuRaw.propTypes = {
    logIn: propTypes.func.isRequired,
    logOut: propTypes.func.isRequired,
    user: propTypes.shape({
        email: propTypes.string
    }),
    location: propTypes.shape({
        pathname: propTypes.string
    }),
    history: propTypes.shape({
        push: propTypes.func
    })
};

MenuRaw.defaultProps = {
    user: {
        email: ''
    },
    location: {
        pathname: ''
    },
    history: {}
};

const mapStateToProps = (state) => {
    const { userData } = state;

    return {
        user: userData.user,
    };
};


const mapDispatchToProps = {
    logIn,
    logOut
};

const Menu = connect(mapStateToProps, mapDispatchToProps)(MenuRaw);
export default Menu;
