import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import ReactSVG from 'react-svg';

import SearchBar from './SearchBar';
import FriendsModal from './FriendsModal';
import Avatar from './Avatar';

import LogoImg from '../img/logo.svg';
import logout from '../img/icons/logout.svg';

import { logIn, logOut } from '../actions/user';

class MenuRaw extends Component {

    componentDidMount() {
        this.autoLogin();
    }

    autoLogin = () => {
        const user = localStorage.getItem('user');
        if (user) {
            const userData = JSON.parse(user);
            this.props.logIn(userData);
        }
    };

    logout = () => {
        localStorage.removeItem('user');
        this.props.logOut();
        this.props.history.push('/landing');
    };

    handleMenu = () => {
        const mobileMenu = document.getElementById('mobileMenu');

        if (mobileMenu.classList.contains('isOpen')) {
            mobileMenu.classList.remove('isOpen');
        } else {
            mobileMenu.classList.add('isOpen');
        }
    };

    render() {
        const { user, location } = this.props;
        const MenuClass = `Menu ${location.pathname === '/' || location.pathname === '/registrace' ? 'isHidden' : ''} ${location.pathname === '/landing' ? 'Menu--transparent' : ''}`;

        return (
            <div className={MenuClass}>
                <div className="Menu-fixed Menu-fixed--desktop">
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
                                                <FriendsModal />
                                            </li>
                                            <li className="Menu-navigationItem">
                                                <div onClick={this.logout}>
                                                    <ReactSVG path={logout} className="Menu-icon" />
                                                </div>
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

                <div className="Menu-mobile" id="mobileMenu">
                    <div className="container">
                        <div className="Menu-mobileMain">
                            <Link to={user.email ? '/timeline' : '/landing'} className="Menu-logo">
                                <ReactSVG path={LogoImg} className="Menu-logoIcon" />
                            </Link>

                            {user.email &&
                                <button className="Hamburger" onClick={this.handleMenu}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </button>
                            }

                            {!user.email &&
                                <Link to="/" className="Button Button--secondary Button--small">
                                    Přihlásit se
                                </Link>
                            }
                        </div>

                        {user.email &&
                            <ul className="Menu-list">
                                <li>
                                    <Link
                                        to="/nova-udalost/krok-1"
                                        className={`Menu-link ${location.pathname.indexOf('nova-udalost') > 0 ? 'isActive' : ''}`}
                                    >
                                        Nová akce
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/timeline"
                                        className={`Menu-link ${location.pathname === '/timeline' ? 'isActive' : ''}`}
                                    >
                                        Akce v okolí
                                    </Link>
                                </li>

                                <li>
                                    <div className="container">
                                        <div className="d-flex justify-content-between flex-wrap w-100 py-3">
                                            <FriendsModal />

                                            <button className="Button Button--logout Button--small Button--red" onClick={this.logout}>
                                                Odhlásit se
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        }
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
